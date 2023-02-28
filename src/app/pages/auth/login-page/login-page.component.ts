import { Component, Inject } from "@angular/core";
import type { AbstractControl, FormGroup } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@/app/services/auth.service";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  public readonly form: FormGroup;

  constructor(
    @Inject(DOCUMENT) document: Document,
    formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router
  ) {
    document.title = "Login - First Launch";
    this.form = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  public get email(): AbstractControl {
    return this.form.get("email") as AbstractControl;
  }

  public get password(): AbstractControl {
    return this.form.get("password") as AbstractControl;
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
    if (this.password.errors?.required) {
      return "Password is required!";
    } else if (this.password.errors?.minlength) {
      return "Password is too short!";
    }
    return "";
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid) {
        this.form.disable();
        await this.authService.login({
          email: this.email.value,
          password: this.password.value,
        });
        await this.router.navigateByUrl("/");
      }
    } catch (err) {
      if (err.message === "UserNotConfirmedException") {
        await this.router.navigate(["/auth/confirm-signup"], {
          queryParams: { email: this.email.value },
        });
      } else if (err.message === "NotAuthorizedException") {
        this.matSnackBar.open("Email or password is incorrect!", "OK", {
          horizontalPosition: "start",
          panelClass: "bg-danger",
        });
        this.form.enable();
      } else {
        this.matSnackBar.open("Unable to login, please try again!", "OK", {
          duration: 5000,
          horizontalPosition: "start",
          panelClass: "bg-danger",
        });
        this.form.enable();
      }
    }
  }
}
