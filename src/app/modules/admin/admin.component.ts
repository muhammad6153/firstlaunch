import { Component, OnDestroy, OnInit } from "@angular/core";
import { DashboardSidemenuService } from "@/app/services/dashboard/dashboard-sidemenu.service";
import { AuthService } from "@/app/services/auth.service";
import { Subscription } from "rxjs";
import { UserRole } from "@/app/models/user";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit, OnDestroy {
  private readonly sidemenuService: DashboardSidemenuService;
  private readonly authService: AuthService;
  private userSubscription: Subscription;

  constructor(
    sidemenuService: DashboardSidemenuService,
    authService: AuthService
  ) {
    this.sidemenuService = sidemenuService;
    this.authService = authService;
    this.userSubscription = Subscription.EMPTY;
  }

  public ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      if (user) {
        switch (user.role) {
          case UserRole.Admin:
            return this.registerAdminLinks();
          case UserRole.Partner:
            return this.registerPartnerLinks();
          case UserRole.Coordinator:
            return this.registerCoordinatorLinks();
          case UserRole.Collaborator:
            return this.registerCollaboratorLinks();
        }
      }
    });
  }

  private registerAdminLinks(): void {
    this.sidemenuService.appendLinks({
      title: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    });
    this.sidemenuService.appendLinks({
      title: "Users",
      href: "/admin/users",
      icon: "groups",
    });
    this.sidemenuService.appendLinks({
      title: "Orders",
      href: "/admin/orders",
      icon: "shopping_cart",
    });
    this.sidemenuService.appendLinks({
      title: "Invoices",
      href: "/admin/invoices",
      icon: "local_atm",
    });
    this.sidemenuService.appendLinks({
      title: "Portfolio",
      href: "/admin/portfolio",
      icon: "art_track",
    });
  }

  private registerPartnerLinks(): void {
    this.sidemenuService.appendLinks({
      title: "Partner Dashboard",
      href: "/partner",
      icon: "dashboard",
    });
    this.sidemenuService.appendLinks({
      title: "Orders",
      href: "/partner/orders",
      icon: "shopping_cart",
    });
  }

  private registerCoordinatorLinks(): void {
    this.sidemenuService.appendLinks({
      title: "Coordinator Dashboard",
      href: "/coordinator",
      icon: "dashboard",
    });
    this.sidemenuService.appendLinks({
      title: "Orders",
      href: "/coordinator/orders",
      icon: "shopping_cart",
    });
  }

  private registerCollaboratorLinks(): void {
    this.sidemenuService.appendLinks({
      title: "Collaborator Dashboard",
      href: "/collaborator",
      icon: "dashboard",
    });
    this.sidemenuService.appendLinks({
      title: "Orders",
      href: "/collaborator/orders",
      icon: "shopping_cart",
    });
  }

  public ngOnDestroy(): void {
    this.sidemenuService.links.next([]);
    this.userSubscription.unsubscribe();
  }
}
