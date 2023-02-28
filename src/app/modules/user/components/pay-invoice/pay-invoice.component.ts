import { Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { InvoicesService } from "@modules/user/services/invoices.service";
import { ActivatedRoute } from "@angular/router";
import { PaymentMethod } from "@modules/user/models/payment-method";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-pay-invoice",
  templateUrl: "./pay-invoice.component.html",
  styleUrls: ["./pay-invoice.component.scss"],
})
export class PayInvoiceComponent {
  public readonly form: FormGroup;
  public readonly invoicesService: InvoicesService;
  public readonly route: ActivatedRoute;
  public loading: boolean;

  constructor(
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    invoicesService: InvoicesService
  ) {
    this.invoicesService = invoicesService;
    this.route = route;
    this.loading = false;
    this.form = formBuilder.group({
      cardHolder: [""],
      pan: [""],
      cvv: [""],
      expiryYear: [21],
      expiryMonth: [1],
    });
  }

  public get cardHolder(): AbstractControl {
    return this.form.get("cardHolder") as AbstractControl;
  }

  public get pan(): AbstractControl {
    return this.form.get("pan") as AbstractControl;
  }

  public get cvv(): AbstractControl {
    return this.form.get("cvv") as AbstractControl;
  }

  public get expiryYear(): AbstractControl {
    return this.form.get("expiryYear") as AbstractControl;
  }

  public get expiryMonth(): AbstractControl {
    return this.form.get("expiryMonth") as AbstractControl;
  }

  public handleSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      const sub = this.route.params
        .pipe(
          switchMap(({ id }) =>
            this.invoicesService.payInvoice(
              id,
              new PaymentMethod(this.form.value)
            )
          )
        )
        .subscribe(() => {
          this.loading = true;
          sub.unsubscribe();
        });
    }
  }
}
