import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "@pages/auth/login-page/login-page.component";
import { SignupPageComponent } from "@pages/auth/signup-page/signup-page.component";
import { ResetPasswordPageComponent } from "@pages/auth/reset-password-page/reset-password-page.component";
import { AuthLayoutComponent } from "@layouts/auth-layout/auth-layout.component";
import { ConfirmSignupPageComponent } from "@pages/auth/confirm-signup-page/confirm-signup-page.component";
import { UnauthGuard } from "@/app/guards/unauth.guard";

const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    canActivate: [UnauthGuard],
    runGuardsAndResolvers: "always",
    children: [
      {
        path: "login",
        component: LoginPageComponent,
        canActivate: [UnauthGuard],
        runGuardsAndResolvers: "always",
      },
      {
        path: "signup",
        component: SignupPageComponent,
        canActivate: [UnauthGuard],
        runGuardsAndResolvers: "always",
      },
      {
        path: "reset-password",
        component: ResetPasswordPageComponent,
        canActivate: [UnauthGuard],
        runGuardsAndResolvers: "always",
      },
      {
        path: "confirm-signup",
        component: ConfirmSignupPageComponent,
        canActivate: [UnauthGuard],
        runGuardsAndResolvers: "always",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
