import { Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardSidemenuService } from "@/app/services/dashboard/dashboard-sidemenu.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit, OnDestroy {
  private readonly sidemenuService: DashboardSidemenuService;

  constructor(sidemenuService: DashboardSidemenuService) {
    this.sidemenuService = sidemenuService;
  }

  public ngOnInit(): void {
    this.sidemenuService.appendLinks({
      title: "Profile",
      href: "/user",
      icon: "person",
    });
    this.sidemenuService.appendLinks({
      title: "Orders",
      href: "/user/orders",
      icon: "shopping_cart",
    });
    this.sidemenuService.appendLinks({
      title: "Invoices",
      href: "/user/invoices",
      icon: "local_atm",
    });
  }

  public ngOnDestroy(): void {
    this.sidemenuService.links.next([]);
  }
}
