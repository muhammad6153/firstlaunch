import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatThemeService } from "@/app/services/mat-theme.service";
import { DOCUMENT } from "@angular/common";
import type { SidemenuLink } from "@/app/services/dashboard/dashboard-sidemenu.service";
import { DashboardSidemenuService } from "@/app/services/dashboard/dashboard-sidemenu.service";
import type { Subscription } from "rxjs";
import type { User } from "@/app/models/user";
import { UserRole } from "@/app/models/user";
import { AuthService } from "@/app/services/auth.service";
import { TranslateService } from "@/app/services/translate.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "app-dashboard-layout",
  templateUrl: "./dashboard-layout.component.html",
  styleUrls: ["./dashboard-layout.component.scss"],
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  private readonly document: Document;
  private readonly sidemenuService: DashboardSidemenuService;
  public readonly matThemeService: MatThemeService;
  private readonly authService: AuthService;
  private readonly translateService: TranslateService;
  public readonly subscriptions: Subscription[];
  public links: SidemenuLink[];
  public currentUser: User | null;
  public isFullscreen: boolean;
  public year: number;

  constructor(
    @Inject(DOCUMENT) document: Document,
    translateService: TranslateService,
    matThemeService: MatThemeService,
    authService: AuthService,
    sidemenuService: DashboardSidemenuService,
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry
  ) {
    this.document = document;
    this.sidemenuService = sidemenuService;
    this.matThemeService = matThemeService;
    this.authService = authService;
    this.translateService = translateService;
    this.matThemeService.loadCurrentTheme();
    this.subscriptions = [];
    this.links = [];
    this.currentUser = null;
    this.isFullscreen = !!document.fullscreenElement;
    this.year = new Date().getFullYear();
    iconRegistry.addSvgIcon(
      "arabic",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/lang-icon/arabic.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "english",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/lang-icon/english.svg"
      )
    );
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.sidemenuService.links.subscribe((links) => {
        this.links = links;
      })
    );
    this.subscriptions.push(
      this.authService.currentUser.subscribe((user) => {
        this.currentUser = user;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public async toggleFullscreen(): Promise<void> {
    if (this.isFullscreen) {
      await this.document.exitFullscreen();
      this.isFullscreen = false;
    } else {
      await this.document.body.requestFullscreen();
      this.isFullscreen = true;
    }
  }

  public async handleSignOut(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (err) {
      console.log(err);
    }
  }

  public isAdmin(): boolean {
    return this.currentUser?.role === UserRole.Admin;
  }

  public isPartner(): boolean {
    return this.currentUser?.role === UserRole.Partner;
  }

  public isCollaborator(): boolean {
    return this.currentUser?.role === UserRole.Collaborator;
  }

  public isCoordinator(): boolean {
    return this.currentUser?.role === UserRole.Coordinator;
  }

  public setLanguage(lang: string): void {
    this.translateService.setLanguage(lang);
  }
}
