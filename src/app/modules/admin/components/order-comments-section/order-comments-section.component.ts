import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "@modules/admin/services/orders.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

@Component({
  selector: "app-order-comments-section",
  templateUrl: "./order-comments-section.component.html",
  styleUrls: ["./order-comments-section.component.scss"],
})
export class OrderCommentsSectionComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute;
  private readonly ordersService: OrdersService;
  private newOrderSubject: BehaviorSubject<null>;
  private orderSubject: BehaviorSubject<null>;
  private orderSubscription: Subscription;
  private newOrderSubscription: Subscription;
  public comments: any[];
  public newComment: string;
  public loading: boolean;

  constructor(route: ActivatedRoute, ordersService: OrdersService) {
    this.route = route;
    this.ordersService = ordersService;
    this.orderSubject = new BehaviorSubject(null);
    this.newOrderSubject = new BehaviorSubject(null);
    this.orderSubscription = Subscription.EMPTY;
    this.newOrderSubscription = Subscription.EMPTY;
    this.comments = [];
    this.newComment = "";
    this.loading = false;
  }

  public ngOnInit(): void {
    this.orderSubscription = this.orderSubject
      .pipe(
        switchMap(() => this.route.params),
        switchMap(({ id }) => this.ordersService.fetchOrderComments(id))
      )
      .subscribe((comments) => {
        this.comments = comments;
      });

    this.newOrderSubscription = this.newOrderSubject
      .pipe(
        switchMap(() => this.route.params),
        switchMap(({ id }) => {
          if (!this.newComment) {
            return of(null);
          }
          return this.ordersService.addOrderComment({
            orderId: +id,
            comment: this.newComment,
          });
        }),
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res !== null) {
          this.newComment = "";
          this.orderSubject.next(null);
        }
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.newOrderSubscription.unsubscribe();
  }

  public addComment(): void {
    this.loading = true;
    this.newOrderSubject.next(null);
  }
}
