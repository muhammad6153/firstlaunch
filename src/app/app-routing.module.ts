import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "@pages/page-not-found/page-not-found.component";
import { LandingLayoutComponent } from "@layouts/landing-layout/landing-layout.component";
import { HomePageComponent } from "@pages/landing/home-page/home-page.component";
import { ServicesPageComponent } from "@pages/landing/services-page/services-page.component";
import { ServicePageComponent } from "@pages/landing/service-page/service-page.component";
import { PricingPageComponent } from "@pages/landing/pricing-page/pricing-page.component";
import { AboutPageComponent } from "@pages/landing/about-page/about-page.component";
import { PortfolioPageComponent } from "@pages/landing/portfolio-page/portfolio-page.component";
import { ContactPageComponent } from "@pages/landing/contact-page/contact-page.component";
import { ServiceOrderPageComponent } from "@pages/landing/service-order-page/service-order-page.component";
import { PrivacyPageComponent } from "@pages/landing/privacy-page/privacy-page.component";
import { TermsPageComponent } from "@pages/landing/terms-page/terms-page.component";
import { RefundPolicyPageComponent } from "@pages/landing/refund-policy-page/refund-policy-page.component";
import { CoordinatorsFormPageComponent } from "@pages/landing/coordinators-form-page/coordinators-form-page.component";
import { PartnershipFormPageComponent } from "@pages/landing/partnership-form-page/partnership-form-page.component";
import { CollaboratorsFormPageComponent } from "@pages/landing/collaborators-form-page/collaborators-form-page.component";
import { TeamPageComponent } from "@pages/landing/team-page/team-page.component";
import { AuthGuard } from "@/app/guards/auth.guard";
import { UnauthGuard } from "@/app/guards/unauth.guard";
import { AdminGuard } from "@/app/guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: LandingLayoutComponent,
    children: [
      { path: "", component: HomePageComponent, pathMatch: "full" },
      { path: "services", component: ServicesPageComponent },
      {
        path: "service/:service",
        children: [
          {
            path: "",
            component: ServicePageComponent,
            pathMatch: "full",
          },
          {
            path: "order/:plan",
            component: ServiceOrderPageComponent,
            canActivate: [AuthGuard],
            runGuardsAndResolvers: "always",
          },
        ],
      },
      { path: "pricing/:service", component: PricingPageComponent },
      { path: "portfolio", component: PortfolioPageComponent },
      { path: "team", component: TeamPageComponent },
      { path: "join/coordinators", component: CoordinatorsFormPageComponent },
      { path: "join/collaborators", component: CollaboratorsFormPageComponent },
      { path: "join/partnership", component: PartnershipFormPageComponent },
      { path: "about", component: AboutPageComponent },
      { path: "contact", component: ContactPageComponent },
      { path: "privacy", component: PrivacyPageComponent },
      { path: "terms", component: TermsPageComponent },
      { path: "refund-policy", component: RefundPolicyPageComponent },
    ],
  },
  {
    path: "auth",
    loadChildren: () => {
      return import("@modules/auth/auth.module").then((m) => m.AuthModule);
    },
    canLoad: [UnauthGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "user",
    loadChildren: () => {
      return import("@modules/user/user.module").then((m) => m.UserModule);
    },
    canLoad: [AuthGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "admin",
    loadChildren: () => {
      return import("@modules/admin/admin.module").then((m) => m.AdminModule);
    },
    canLoad: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "partner",
    loadChildren: () => {
      return import("@modules/admin/admin.module").then((m) => m.AdminModule);
    },
    canLoad: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "collaborator",
    loadChildren: () => {
      return import("@modules/admin/admin.module").then((m) => m.AdminModule);
    },
    canLoad: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: "always",
  },
  {
    path: "coordinator",
    loadChildren: () => {
      return import("@modules/admin/admin.module").then((m) => m.AdminModule);
    },
    canLoad: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: "always",
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
