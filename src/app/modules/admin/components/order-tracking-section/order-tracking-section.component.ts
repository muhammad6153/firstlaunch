import type { OnDestroy, SimpleChanges } from "@angular/core";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { TalentTrackService } from "@/app/services/talenttrack.service";
import { BehaviorSubject, of, Subscription } from "rxjs";
import type { Nullish } from "@/app/models/nullish";
import { catchError, switchMap } from "rxjs/operators";
import { OrdersService } from "@modules/admin/services/orders.service";
import type { TalentTrack } from "@/app/models/talent-track";
import OrderTrack from "@/app/models/order-track";

@Component({
  selector: "app-order-tracking-section",
  templateUrl: "./order-tracking-section.component.html",
  styleUrls: ["./order-tracking-section.component.scss"],
})
export class OrderTrackingSectionComponent
  implements OnInit, OnChanges, OnDestroy {
  private readonly TalentTrackService: TalentTrackService;
  private readonly ordersService: OrdersService;

  @Input()
  public orderTrack: Nullish<OrderTrack>;

  @Output()
  public orderTrackUpdated: EventEmitter<void>;

  public readonly $orderTrackSubject: BehaviorSubject<Nullish<OrderTrack>>;
  public readonly $updateOrderSubject: BehaviorSubject<boolean>;

  private orderSubscription: Subscription;
  private updateOrderSubscription: Subscription;

  public steps: string[];
  public loading: boolean;

  constructor(TalentTrackService: TalentTrackService, ordersService: OrdersService) {
    this.TalentTrackService = TalentTrackService;
    this.ordersService = ordersService;
    this.orderTrack = null;
    this.orderTrackUpdated = new EventEmitter();
    this.$orderTrackSubject = new BehaviorSubject<Nullish<OrderTrack>>(null);
    this.$updateOrderSubject = new BehaviorSubject<boolean>(false);
    this.orderSubscription = Subscription.EMPTY;
    this.updateOrderSubscription = Subscription.EMPTY;
    this.steps = [];
    this.loading = true;
  }

  public ngOnInit(): void {
    this.orderSubscription = this.$orderTrackSubject
      .pipe(
        switchMap((orderTrack) =>
          this.TalentTrackService.fetchService(orderTrack?.orderService ?? "")
        )
      )
      .subscribe(this.handleOrderSubscription.bind(this));
    this.updateOrderSubscription = this.$updateOrderSubject
      .pipe(
        switchMap((value) => {
          if (value && this.orderTrack) {
            const { orderId, currentStateIndicator } = this.orderTrack;
            return this.ordersService.updateOrderState(
              orderId,
              currentStateIndicator + 1
            );
          }
          return of();
        }),
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((res) => {
        this.loading = false;
        if (res !== null) {
          this.orderTrackUpdated.emit();
        }
      });
  }

  public ngOnChanges({ orderTrack }: SimpleChanges): void {
    this.$orderTrackSubject.next(orderTrack.currentValue);
  }

  public ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.updateOrderSubscription.unsubscribe();
  }

  private handleOrderSubscription(service: Nullish<TalentTrack>): void {
    if (service) {
      this.steps = service.orderSteps;
      this.loading = false;
    }
  }

  public incrementCurrentState(): void {
    this.loading = true;
    this.$updateOrderSubject.next(true);
  }
}
