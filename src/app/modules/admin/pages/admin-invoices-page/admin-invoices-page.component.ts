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
import { UserInvoice } from "@modules/user/models/user-invoice";
import { InvoicesService } from "@modules/admin/services/invoices.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AdminUtilsService } from "@modules/admin/services/admin-utils.service";

@Component({
  selector: "app-admin-invoices-page",
  templateUrl: "./admin-invoices-page.component.html",
  styleUrls: ["./admin-invoices-page.component.scss"],
})
export class AdminInvoicesPageComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private readonly invoicesService: InvoicesService;
  private readonly utilsService: AdminUtilsService;
  public readonly dataSource: MatTableDataSource<UserInvoice>;
  public readonly displayedColumns: string[];
  private subscription: Subscription;
  public fetchingInvoices: boolean;

  @ViewChild(MatPaginator)
  private readonly paginator!: MatPaginator;

  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  private dataLoader: BehaviorSubject<null>;

  constructor(
    invoicesService: InvoicesService,
    utilsService: AdminUtilsService
  ) {
    this.invoicesService = invoicesService;
    this.utilsService = utilsService;
    this.dataSource = new MatTableDataSource<UserInvoice>([]);
    this.subscription = Subscription.EMPTY;
    this.fetchingInvoices = true;
    this.displayedColumns = [
      "id",
      "orderId",
      "amount",
      "taxRate",
      "isPaid",
      "creationDate",
    ];
    this.dataLoader = new BehaviorSubject(null);
  }

  public ngOnInit(): void {
    this.subscription = this.dataLoader
      .pipe(
        switchMap(() => this.invoicesService.fetchInvoices()),
        switchMap(() => this.invoicesService.invoices())
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

  private handleSubscription(invoices: UserInvoice[]): void {
    this.dataSource.data = invoices;
    this.fetchingInvoices = false;
  }

  public fetchData(): void {
    this.fetchingInvoices = true;
    this.dataLoader.next(null);
  }

  public downloadData(): void {
    this.utilsService.downloadFile(
      this.dataSource.data,
      ["id", "orderId", "amount", "currency", "isPaid", "creationDate"],
      "first-launch-invoices"
    );
  }
}
