import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginPageComponent } from "@pages/auth/login-page/login-page.component";
import { SignupPageComponent } from "@pages/auth/signup-page/signup-page.component";
import { ResetPasswordPageComponent } from "@pages/auth/reset-password-page/reset-password-page.component";
import { MaterialModule } from "@modules/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutComponent } from "@layouts/auth-layout/auth-layout.component";
import { ConfirmSignupPageComponent } from "@pages/auth/confirm-signup-page/confirm-signup-page.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    ResetPasswordPageComponent,
    AuthLayoutComponent,
    ConfirmSignupPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
export class AuthModule {}
