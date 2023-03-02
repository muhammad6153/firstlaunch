import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "@modules/user/services/orders.service";
import { forkJoin, Observable, Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { catchError, switchMap } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";
import { TalentTrackService } from "@/app/services/talenttrack.service";
import { BehaviorSubject, of } from "rxjs";
import OrderTrack from "@/app/models/order-track";
import type { NewCommentEvent } from "@components/shared/text-editor/text-editor.component";
import { AwsService } from "@/app/services/aws.service";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-user-order-track-page",
  templateUrl: "./user-order-track-page.component.html",
  styleUrls: ["./user-order-track-page.component.scss"],
})
export class UserOrderTrackPageComponent implements OnInit, OnDestroy {
  private readonly ordersService: OrdersService;
  private readonly TalentTrackService: TalentTrackService;
  private readonly route: ActivatedRoute;
  private readonly awsService: AwsService;
  private orderTrackSubscription: Subscription;
  private orderTrackLoaderSubject: BehaviorSubject<null>;
  public loading: boolean;
  public steps: string[];
  public orderTrack: Nullish<OrderTrack>;

  constructor(
    route: ActivatedRoute,
    ordersService: OrdersService,
    TalentTrackService: TalentTrackService,
    awsService: AwsService
  ) {
    this.route = route;
    this.ordersService = ordersService;
    this.TalentTrackService = TalentTrackService;
    this.awsService = awsService;
    this.orderTrackLoaderSubject = new BehaviorSubject(null);
    this.orderTrackSubscription = Subscription.EMPTY;
    this.loading = true;
    this.steps = [];
    this.orderTrack = new OrderTrack({});
  }

  public ngOnInit(): void {
    this.orderTrackSubscription = this.orderTrackLoaderSubject
      .pipe(
        switchMap(() => this.route.params),
        switchMap((params) => this.ordersService.fetchOrderTrack(params.id)),
        switchMap((track) => {
          this.orderTrack = track;
          if (track && track.orderService) {
            return this.TalentTrackService.fetchService(track.orderService);
          }
          return of(null);
        })
      )
      .subscribe((service) => {
        this.steps = service ? service.orderSteps : [];
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    this.orderTrackLoaderSubject.unsubscribe();
  }

  private joinUploads(
    event: NewCommentEvent
  ): Observable<Record<string, string>> {
    if (!event.comment.attachments.length) {
      return of({});
    }
    return forkJoin(
      event.comment.attachments.reduce((obj, file) => {
        const imageKey = `public/orders/track/${
          this.orderTrack?.id
        }/comments/${uuid()}___${file.name}`;
        return {
          ...obj,
          [file.name]: this.awsService.uploadFile(file, imageKey),
        };
      }, {})
    );
  }

  public addComment(event: NewCommentEvent): void {
    if (!this.orderTrack?.id || !event.comment.comment) {
      return event.finalize();
    }
    const sub = this.joinUploads(event)
      .pipe(
        switchMap((attachments) => {
          const comment = {
            comment: event.comment.comment,
            orderTrackId: this.orderTrack?.id ?? 0,
            attachments: Object.values(attachments),
          };
          return this.ordersService.addOrderTrackComment(
            comment.orderTrackId,
            comment
          );
        })
      )
      .pipe(
        catchError((e) => {
          console.log(e);
          event.finalize();
          return of(null);
        })
      )
      .subscribe(() => {
        this.orderTrackLoaderSubject.next(null);
        sub.unsubscribe();
      });
  }
}
