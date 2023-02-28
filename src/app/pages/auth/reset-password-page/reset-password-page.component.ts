import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import type { AbstractControl, FormGroup } from "@angular/forms";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-reset-password-page",
  templateUrl: "./reset-password-page.component.html",
  styleUrls: ["./reset-password-page.component.scss"],
})
export class ResetPasswordPageComponent {
  public readonly form: FormGroup;

  constructor(
    @Inject(DOCUMENT) document: Document,
    formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly matSnackBar: MatSnackBar
  ) {
    document.title = "Reset password - First Launch";
    this.form = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  public get email(): AbstractControl {
    return this.form.get("email") as AbstractControl;
  }

  public getEmailError(): string {
    if (this.email.errors?.required) {
      return "Email is required!";
    } else if (this.email.errors?.email) {
      return "Email is invalid!";
    }
    return "";
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid) {
        this.form.disable();
        await this.authService.sendPasswordRecoveryCode({
          email: this.email.value,
        });
        this.showSuccessMessageAfterSubmit();
        this.form.enable();
        this.form.reset();
      }
    } catch (err) {
      console.log(err);
      this.showErrorMessageAfterSubmit();
      this.form.enable();
    }
  }

  private showSuccessMessageAfterSubmit(): void {
    this.matSnackBar.open("Welcome back!", "OK", {
      duration: 5000,
      horizontalPosition: "start",
      panelClass: "bg-success",
    });
  }

  private showErrorMessageAfterSubmit(): void {
    this.matSnackBar.open("Unable to login, please try again!", "OK", {
      duration: 5000,
      horizontalPosition: "start",
      panelClass: "bg-danger",
    });
  }
}
