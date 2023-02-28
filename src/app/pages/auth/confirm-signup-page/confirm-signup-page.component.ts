import { Component, Inject } from "@angular/core";
import type { AbstractControl, FormGroup } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-confirm-signup-page",
  templateUrl: "./confirm-signup-page.component.html",
  styleUrls: ["./confirm-signup-page.component.scss"],
})
export class ConfirmSignupPageComponent {
  public readonly form: FormGroup;

  constructor(
    @Inject(DOCUMENT) document: Document,
    formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router
  ) {
    document.title = "Confirm signup - First Launch";
    const params = this.router.routerState.snapshot.root.queryParams;
    this.form = formBuilder.group({
      email: [params.email ?? "", [Validators.required, Validators.email]],
      confirmationCode: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  public get email(): AbstractControl {
    return this.form.get("email") as AbstractControl;
  }

  public get confirmationCode(): AbstractControl {
    return this.form.get("confirmationCode") as AbstractControl;
  }

  public getEmailError(): string {
    if (this.email.errors?.required) {
      return "Email is required!";
    } else if (this.email.errors?.email) {
      return "Email is invalid!";
    }
    return "";
  }

  public getPasswordError(): string {
    if (this.confirmationCode.errors?.required) {
      return "Password is required!";
    } else if (this.confirmationCode.errors?.minlength) {
      return "Password is too short!";
    }
    return "";
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid) {
        this.form.disable();
        await this.authService.confirmSignup({
          email: this.email.value,
          confirmationCode: this.confirmationCode.value,
        });
        this.matSnackBar.open(
          "Account confirmed successfully, now you are ready to login!",
          "OK",
          {
            duration: 15000,
            horizontalPosition: "start",
            panelClass: "bg-success",
          }
        );
        await this.router.navigateByUrl("/auth/login");
      }
    } catch (err) {
      this.matSnackBar.open(
        "Unable to confirm account, please try again!",
        "OK",
        {
          duration: 5000,
          horizontalPosition: "start",
          panelClass: "bg-danger",
        }
      );
      this.form.enable();
    }
  }
}
