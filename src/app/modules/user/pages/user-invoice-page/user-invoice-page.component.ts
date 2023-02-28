import { Component, OnDestroy, OnInit } from "@angular/core";
import { InvoicesService } from "@modules/user/services/invoices.service";
import type { Subscription } from "rxjs";
import type { UserInvoice } from "@modules/user/models/user-invoice";
import type { Nullish } from "@/app/models/nullish";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-user-invoice-page",
  templateUrl: "./user-invoice-page.component.html",
  styleUrls: ["./user-invoice-page.component.scss"],
})
export class UserInvoicePageComponent implements OnInit, OnDestroy {
  private readonly invoicesService: InvoicesService;
  private readonly route: ActivatedRoute;
  private readonly subscriptions: Subscription[];
  public invoice: Nullish<UserInvoice>;
  public fetchingInvoice: boolean;
  public taxAmount: number;

  constructor(route: ActivatedRoute, invoicesService: InvoicesService) {
    this.invoicesService = invoicesService;
    this.route = route;
    this.subscriptions = [];
    this.invoice = null;
    this.fetchingInvoice = true;
    this.taxAmount = 0;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.params
        .pipe(
          switchMap((params) => {
            return this.invoicesService.fetchInvoice(params.id);
          })
        )
        .subscribe((invoice) => {
          this.fetchingInvoice = false;
          this.invoice = invoice;
          if (invoice) {
            this.taxAmount = (invoice.taxRate * invoice.amount) / 100;
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
