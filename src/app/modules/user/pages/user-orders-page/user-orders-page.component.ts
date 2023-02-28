import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "@modules/user/services/orders.service";
import type { Subscription } from "rxjs";
import type { UserOrder } from "@modules/user/models/user-order";

@Component({
  selector: "app-user-orders-page",
  templateUrl: "./user-orders-page.component.html",
  styleUrls: ["./user-orders-page.component.scss"],
})
export class UserOrdersPageComponent implements OnInit, OnDestroy {
  private readonly ordersService: OrdersService;
  private readonly subscriptions: Subscription[];
  public orders: UserOrder[];
  public fetchingOrders: boolean;

  constructor(ordersService: OrdersService) {
    this.ordersService = ordersService;
    this.subscriptions = [];
    this.orders = [];
    this.fetchingOrders = true;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.ordersService.fetchOrders().subscribe(() => {
        this.fetchingOrders = false;
      })
    );
    this.subscriptions.push(
      this.ordersService.orders().subscribe((orders) => {
        this.orders = orders;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
