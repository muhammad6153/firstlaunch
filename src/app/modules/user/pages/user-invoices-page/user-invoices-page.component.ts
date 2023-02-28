import { Component, OnDestroy, OnInit } from "@angular/core";
import { InvoicesService } from "@modules/user/services/invoices.service";
import type { Subscription } from "rxjs";
import type { UserInvoice } from "@modules/user/models/user-invoice";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-user-invoices-page",
  templateUrl: "./user-invoices-page.component.html",
  styleUrls: ["./user-invoices-page.component.scss"],
})
export class UserInvoicesPageComponent implements OnInit, OnDestroy {
  private readonly invoicesService: InvoicesService;
  private readonly subscriptions: Subscription[];
  public invoices: UserInvoice[];
  public fetchingInvoices: boolean;
  public payingInvoice: boolean;

  constructor(invoicesService: InvoicesService) {
    this.invoicesService = invoicesService;
    this.subscriptions = [];
    this.invoices = [];
    this.fetchingInvoices = true;
    this.payingInvoice = false;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.invoicesService
        .fetchInvoices()
        .pipe(
          switchMap(() => {
            return this.invoicesService.invoices();
          })
        )
        .subscribe((invoices) => {
          this.fetchingInvoices = false;
          this.invoices = invoices.map((invoice) => ({
            ...invoice,
            amount: (invoice.taxRate * invoice.amount) / 100,
          }));
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public handlePayInvoice(id: number): void {
    this.payingInvoice = true;
    const sub = this.invoicesService.payInvoice(id).subscribe((res) => {
      if (res.redirect_url && typeof res.redirect_url === "string") {
        location.href = res.redirect_url;
      }
      this.payingInvoice = false;
      sub.unsubscribe();
    });
  }
}
