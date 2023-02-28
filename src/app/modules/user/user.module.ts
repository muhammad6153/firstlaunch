import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "@modules/user/user-routing.module";
import { OrdersService } from "@modules/user/services/orders.service";
import { InvoicesService } from "@modules/user/services/invoices.service";
import { UserOrdersPageComponent } from "@modules/user/pages/user-orders-page/user-orders-page.component";
import { UserOrderPageComponent } from "@modules/user/pages/user-order-page/user-order-page.component";
import { UserInvoicePageComponent } from "@modules/user/pages/user-invoice-page/user-invoice-page.component";
import { UserInvoicesPageComponent } from "@modules/user/pages/user-invoices-page/user-invoices-page.component";
import { UserProfilePageComponent } from "@modules/user/pages/user-profile-page/user-profile-page.component";
import { UserOrderTrackPageComponent } from "@modules/user/pages/user-order-track-page/user-order-track-page.component";
import { ServicesService } from "@/app/services/services.service";
import { UserComponent } from "@modules/user/user.component";
import { DashboardModule } from "@modules/shared/dashboard/dashboard.module";
import { PayInvoicePageComponent } from "@modules/user/pages/pay-invoice-page/pay-invoice-page.component";

@NgModule({
  declarations: [
    UserComponent,
    UserOrdersPageComponent,
    UserOrderPageComponent,
    UserInvoicePageComponent,
    UserInvoicesPageComponent,
    UserProfilePageComponent,
    UserOrderTrackPageComponent,
    PayInvoicePageComponent,
  ],
  imports: [CommonModule, UserRoutingModule, DashboardModule],
  providers: [OrdersService, InvoicesService, ServicesService],
  bootstrap: [UserComponent],
})
export class UserModule {}
