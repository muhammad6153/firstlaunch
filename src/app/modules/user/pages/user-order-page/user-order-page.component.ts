import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "@modules/user/services/orders.service";
import type { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";
import type { UserOrder } from "@modules/user/models/user-order";

@Component({
  selector: "app-user-order-page",
  templateUrl: "./user-order-page.component.html",
  styleUrls: ["./user-order-page.component.scss"],
})
export class UserOrderPageComponent implements OnInit, OnDestroy {
  private readonly ordersService: OrdersService;
  private readonly route: ActivatedRoute;
  private readonly subscriptions: Subscription[];
  public order: Nullish<UserOrder>;
  public fetchingOrder: boolean;

  constructor(route: ActivatedRoute, ordersService: OrdersService) {
    this.route = route;
    this.ordersService = ordersService;
    this.subscriptions = [];
    this.order = null;
    this.fetchingOrder = true;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.params
        .pipe(
          switchMap((params) => {
            return this.ordersService.fetchOrder(params.id);
          })
        )
        .subscribe((order) => {
          this.order = order;
          this.fetchingOrder = false;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public a(): string {
    return JSON.stringify(this.order, null, 2);
  }
}
