import { Component, OnDestroy, OnInit } from "@angular/core";
import type { Nullish } from "@/app/models/nullish";
import type { UserInvoice } from "@modules/user/models/user-invoice";
import { InvoicesService } from "@modules/admin/services/invoices.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-admin-invoice-page",
  templateUrl: "./admin-invoice-page.component.html",
  styleUrls: ["./admin-invoice-page.component.scss"],
})
export class AdminInvoicePageComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute;
  private readonly invoiceService: InvoicesService;
  private readonly $requestSubject: BehaviorSubject<null>;
  private subscription: Subscription;
  public invoice: Nullish<UserInvoice>;
  public loading: boolean;

  public displayedColumns: string[];
  public dataSource: UserInvoice[];

  public taxAmount: number;

  constructor(route: ActivatedRoute, invoiceService: InvoicesService) {
    this.route = route;
    this.invoiceService = invoiceService;
    this.$requestSubject = new BehaviorSubject(null);
    this.subscription = Subscription.EMPTY;
    this.invoice = null;
    this.loading = true;
    this.displayedColumns = ["description", "price", "subtotal"];
    this.dataSource = [];
    this.taxAmount = 0;
  }

  public ngOnInit(): void {
    this.subscription = this.$requestSubject
      .pipe(
        switchMap(() => this.route.params),
        switchMap(({ id }) => this.invoiceService.fetchInvoice(id))
      )
      .subscribe((invoice) => {
        this.invoice = invoice;
        if (invoice) {
          this.dataSource = [invoice];
          this.taxAmount = (invoice.taxRate * invoice.amount) / 100;
        }
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public fetchData(): void {
    this.loading = true;
    this.$requestSubject.next(null);
  }

  public downloadInvoice(): void {}

  public switchInvoiceState(): void {
    this.loading = true;
    const sub = this.route.params
      .pipe(switchMap(({ id }) => this.invoiceService.updateInvoiceState(id)))
      .subscribe(() => {
        this.fetchData();
        sub.unsubscribe();
      });
  }
}
