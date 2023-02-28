import { Component, Inject } from "@angular/core";
import type { AbstractControl, FormGroup } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmPasswordValidator } from "@/app/validators/confirm-password.validator";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.scss"],
})
export class SignupPageComponent {
  public readonly form: FormGroup;
  private readonly authService: AuthService;
  private readonly matSnackBar: MatSnackBar;
  private readonly router: Router;

  constructor(
    @Inject(DOCUMENT) document: Document,
    formBuilder: FormBuilder,
    authService: AuthService,
    matSnackBar: MatSnackBar,
    router: Router
  ) {
    document.title = "Signup - First Launch";
    this.authService = authService;
    this.matSnackBar = matSnackBar;
    this.router = router;
    this.form = formBuilder.group(
      {
        name: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        password2: ["", [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator("password", "password2"),
      }
    );
  }

  public get name(): AbstractControl {
    return this.form.get("name") as AbstractControl;
  }

  public get email(): AbstractControl {
    return this.form.get("email") as AbstractControl;
  }

  public get password(): AbstractControl {
    return this.form.get("password") as AbstractControl;
  }

  public get password2(): AbstractControl {
    return this.form.get("password2") as AbstractControl;
  }

  public getNameError(): string {
    if (this.name.errors?.required) {
      return "Name is required!";
    } else if (this.name.errors?.minlength) {
      return "Name is too short!";
    }
    return "";
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

  public getPassword2Error(): string {
    if (this.password2.errors?.required) {
      return "Password is required!";
    } else if (this.password2.errors?.confirmPasswordValidator) {
      return "Passwords doesn't match!";
    }
    return "";
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid) {
        this.form.disable();
        await this.authService.signup({
          name: this.name.value,
          email: this.email.value,
          password: this.password.value,
        });
        this.matSnackBar.open("Account created successfully!", "OK", {
          horizontalPosition: "start",
          panelClass: "bg-success",
          duration: 5000,
        });
        await this.router.navigate(["/auth/confirm-signup"], {
          queryParams: { email: this.email.value },
        });
      }
    } catch (err) {
      if (err.message === "UsernameExistsException") {
        this.matSnackBar.open(
          "An account with this email address already exists, please login instead or use a different email address!",
          "OK",
          {
            horizontalPosition: "start",
            panelClass: "bg-warning",
            duration: 5000,
          }
        );
      } else {
        this.matSnackBar.open("Unable to signup, please try again!", "OK", {
          horizontalPosition: "start",
          panelClass: "bg-danger",
          duration: 5000,
        });
      }
      this.form.enable();
    }
  }
}
