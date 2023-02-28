import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartsModule } from "ng2-charts";
import { AdminRoutingModule } from "@modules/admin/admin-routing.module";
import { AdminComponent } from "@modules/admin/admin.component";
import { DashboardModule } from "@modules/shared/dashboard/dashboard.module";
import { DashboardPageComponent } from "@modules/admin/pages/dashboard-page/dashboard-page.component";
import { AdminOrdersPageComponent } from "@modules/admin/pages/admin-orders-page/admin-orders-page.component";
import { AdminInvoicesPageComponent } from "@modules/admin/pages/admin-invoices-page/admin-invoices-page.component";
import { AdminUsersPageComponent } from "@modules/admin/pages/admin-users-page/admin-users-page.component";
import { AdminPortfolioPageComponent } from "@modules/admin/pages/admin-portfolio-page/admin-portfolio-page.component";
import { InvoicesService } from "@modules/admin/services/invoices.service";
import { AdminInvoicePageComponent } from "@modules/admin/pages/admin-invoice-page/admin-invoice-page.component";
import { AdminUserPageComponent } from "@modules/admin/pages/admin-user-page/admin-user-page.component";
import { AdminOrderPageComponent } from "@modules/admin/pages/admin-order-page/admin-order-page.component";
import { AdminPortfolioItemPageComponent } from "@modules/admin/pages/admin-portfolio-item-page/admin-portfolio-item-page.component";
import { UsersService } from "@modules/admin/services/users.service";
import { OrdersService } from "@modules/admin/services/orders.service";
import { PortfolioService } from "@modules/admin/services/portfolio.service";
import { AnalyticsService } from "@modules/admin/services/analytics.service";
import { AdminUtilsService } from "@modules/admin/services/admin-utils.service";
import { OrderCommentsSectionComponent } from "@modules/admin/components/order-comments-section/order-comments-section.component";
import { OrderTrackingSectionComponent } from "@modules/admin/components/order-tracking-section/order-tracking-section.component";
import { NewPortfolioItemDialogComponent } from "@modules/admin/dialogs/new-portfolio-item-dialog/new-portfolio-item-dialog.component";
import { AdminOrderTrackPageComponent } from "@modules/admin/pages/admin-order-track-page/admin-order-track-page.component";
import { OrderAssociationsDialogComponent } from "@modules/admin/dialogs/order-associations-dialog/order-associations-dialog.component";

@NgModule({
  declarations: [
    AdminComponent,
    DashboardPageComponent,
    AdminOrdersPageComponent,
    AdminInvoicesPageComponent,
    AdminUsersPageComponent,
    AdminPortfolioPageComponent,
    AdminInvoicePageComponent,
    AdminUserPageComponent,
    AdminOrderPageComponent,
    AdminPortfolioItemPageComponent,
    OrderCommentsSectionComponent,
    OrderTrackingSectionComponent,
    NewPortfolioItemDialogComponent,
    AdminOrderTrackPageComponent,
    OrderAssociationsDialogComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, DashboardModule, ChartsModule],
  providers: [
    InvoicesService,
    UsersService,
    OrdersService,
    PortfolioService,
    AnalyticsService,
    AdminUtilsService,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
