import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "@modules/admin/admin.component";
import { DashboardPageComponent } from "@modules/admin/pages/dashboard-page/dashboard-page.component";
import { AdminUsersPageComponent } from "@modules/admin/pages/admin-users-page/admin-users-page.component";
import { AdminOrdersPageComponent } from "@modules/admin/pages/admin-orders-page/admin-orders-page.component";
import { AdminInvoicesPageComponent } from "@modules/admin/pages/admin-invoices-page/admin-invoices-page.component";
import { AdminPortfolioPageComponent } from "@modules/admin/pages/admin-portfolio-page/admin-portfolio-page.component";
import { AdminInvoicePageComponent } from "@modules/admin/pages/admin-invoice-page/admin-invoice-page.component";
import { AdminUserPageComponent } from "@modules/admin/pages/admin-user-page/admin-user-page.component";
import { AdminOrderPageComponent } from "@modules/admin/pages/admin-order-page/admin-order-page.component";
import { AdminPortfolioItemPageComponent } from "@modules/admin/pages/admin-portfolio-item-page/admin-portfolio-item-page.component";
import { AdminOrderTrackPageComponent } from "@modules/admin/pages/admin-order-track-page/admin-order-track-page.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        component: DashboardPageComponent,
        pathMatch: "full",
      },
      {
        path: "users",
        children: [
          {
            path: "",
            component: AdminUsersPageComponent,
            pathMatch: "full",
          },
          {
            path: ":id",
            component: AdminUserPageComponent,
          },
        ],
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            component: AdminOrdersPageComponent,
            pathMatch: "full",
          },
          {
            path: ":id",
            component: AdminOrderPageComponent,
          },
          {
            path: "track/:id",
            component: AdminOrderTrackPageComponent,
          },
        ],
      },
      {
        path: "invoices",
        children: [
          {
            path: "",
            component: AdminInvoicesPageComponent,
            pathMatch: "full",
          },
          {
            path: ":id",
            component: AdminInvoicePageComponent,
          },
        ],
      },
      {
        path: "portfolio",
        children: [
          {
            path: "",
            component: AdminPortfolioPageComponent,
            pathMatch: "full",
          },
          {
            path: ":id",
            component: AdminPortfolioItemPageComponent,
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
export class AdminRoutingModule {}
