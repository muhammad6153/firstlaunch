import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { UserOrderPageComponent } from "@modules/user/pages/user-order-page/user-order-page.component";
import { UserOrdersPageComponent } from "@modules/user/pages/user-orders-page/user-orders-page.component";
import { UserInvoicesPageComponent } from "@modules/user/pages/user-invoices-page/user-invoices-page.component";
import { UserInvoicePageComponent } from "@modules/user/pages/user-invoice-page/user-invoice-page.component";
import { UserOrderTrackPageComponent } from "@modules/user/pages/user-order-track-page/user-order-track-page.component";
import { UserProfilePageComponent } from "@modules/user/pages/user-profile-page/user-profile-page.component";
import { UserComponent } from "@modules/user/user.component";
import { AuthGuard } from "@/app/guards/auth.guard";
import { PayInvoicePageComponent } from "@modules/user/pages/pay-invoice-page/pay-invoice-page.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: "always",
    children: [
      {
        path: "",
        pathMatch: "full",
        component: UserProfilePageComponent,
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            pathMatch: "full",
            component: UserOrdersPageComponent,
          },
          {
            path: ":id",
            component: UserOrderPageComponent,
          },
          {
            path: "track/:id",
            component: UserOrderTrackPageComponent,
          },
        ],
      },
      {
        path: "invoices",
        children: [
          {
            path: "",
            pathMatch: "full",
            component: UserInvoicesPageComponent,
          },
          {
            path: ":id",
            children: [
              {
                path: "",
                pathMatch: "full",
                component: UserInvoicePageComponent,
              },
              {
                path: "pay",
                component: PayInvoicePageComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
