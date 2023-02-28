import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { InvoicesService } from "@modules/user/services/invoices.service";
import { ActivatedRoute } from "@angular/router";
import { catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-pay-invoice-page",
  templateUrl: "./pay-invoice-page.component.html",
  styleUrls: ["./pay-invoice-page.component.scss"],
})
export class PayInvoicePageComponent {
  public readonly form: FormGroup;
  public readonly invoicesService: InvoicesService;
  public readonly route: ActivatedRoute;

  constructor(
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    invoicesService: InvoicesService
  ) {
    this.invoicesService = invoicesService;
    this.route = route;
    this.form = formBuilder.group({
      cardHolder: [""],
      pan: [""],
      cvv: [""],
      expiryYear: [21],
      expiryMonth: [1],
    });
  }

  public handleSubmit(): void {
    if (this.form.valid) {
      this.form.disable();
      const sub = this.route.params
        .pipe(
          switchMap(({ id }) => this.invoicesService.payInvoice(id)),
          catchError((err) => of(err))
        )
        .subscribe(() => {
          this.form.enable();
          sub.unsubscribe();
        });
    }
  }
}
