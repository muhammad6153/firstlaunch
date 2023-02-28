import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { switchMap } from "rxjs/operators";
import { UserOrder } from "@modules/user/models/user-order";
import { BehaviorSubject, Subscription } from "rxjs";
import { OrdersService } from "@modules/admin/services/orders.service";
import { AdminUtilsService } from "@modules/admin/services/admin-utils.service";

@Component({
  selector: "app-admin-orders-page",
  templateUrl: "./admin-orders-page.component.html",
  styleUrls: ["./admin-orders-page.component.scss"],
})
export class AdminOrdersPageComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private readonly orderService: OrdersService;
  private readonly utilsService: AdminUtilsService;
  public readonly dataSource: MatTableDataSource<UserOrder>;
  public readonly displayedColumns: string[];
  private subscription: Subscription;
  public fetchingOrders: boolean;

  @ViewChild(MatPaginator)
  private readonly paginator!: MatPaginator;

  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  private dataLoader: BehaviorSubject<null>;

  constructor(orderService: OrdersService, utilsService: AdminUtilsService) {
    this.orderService = orderService;
    this.utilsService = utilsService;
    this.dataSource = new MatTableDataSource<UserOrder>([]);
    this.subscription = Subscription.EMPTY;
    this.fetchingOrders = true;
    this.displayedColumns = ["id", "userId", "service", "plan", "creationDate"];
    this.dataLoader = new BehaviorSubject(null);
  }

  public ngOnInit(): void {
    this.subscription = this.dataLoader
      .pipe(
        switchMap(() => this.orderService.fetchOrders()),
        switchMap(() => this.orderService.orders())
      )
      .subscribe(this.handleSubscription.bind(this));
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public fetchData(): void {
    this.fetchingOrders = true;
    this.dataLoader.next(null);
  }

  private handleSubscription(orders: UserOrder[]): void {
    this.dataSource.data = orders;
    this.fetchingOrders = false;
  }

  public downloadData(): void {
    this.utilsService.downloadFile(
      this.dataSource.data,
      ["id", "userId", "service", "plan", "creationDate"],
      "first-launch-orders"
    );
  }
}
