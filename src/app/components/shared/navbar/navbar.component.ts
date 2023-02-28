import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "@/app/services/auth.service";
import type { Subscription } from "rxjs";
import type { User } from "@/app/models/user";
import { UserRole } from "@/app/models/user";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { TranslateService } from "@/app/services/translate.service";
import { MatThemeService } from "@/app/services/mat-theme.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly authService: AuthService;
  private readonly translateService: TranslateService;
  public readonly matThemeService: MatThemeService;
  private userSubscription?: Subscription;
  public user: User | null;
  public navbarHasBackground: boolean;
  public navbarMenuVisible: boolean;
  private  router: Router;

  constructor(
    authService: AuthService,
    translateService: TranslateService,
    matThemeService: MatThemeService,
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry,
    router: Router
  ) {
    this.authService = authService;
    this.translateService = translateService;
    this.matThemeService = matThemeService;
    this.navbarHasBackground = false;
    this.navbarMenuVisible = false;
    this.user = null;
    this.router = router;
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

  @HostListener("window:scroll", ["$event"])
  private handleWindowScroll(): void {
    this.navbarHasBackground = window.scrollY >= 60;
  }

  public ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  public async handleSignOut(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (err) {
      console.log(err);
    }
  }

  public isAdmin(): boolean {
    return this.user?.role === UserRole.Admin;
  }

  public isPartner(): boolean {
    return this.user?.role === UserRole.Partner;
  }

  public isCollaborator(): boolean {
    return this.user?.role === UserRole.Collaborator;
  }

  public isCoordinator(): boolean {
    return this.user?.role === UserRole.Coordinator;
  }

  public setLanguage(lang: string): void {
    this.translateService.setLanguage(lang);
  }
  public scroll(elemid: string): void {
      let el = document.getElementById(elemid);
      if(el)
        el.scrollIntoView();
      else{
        this.router.navigateByUrl('/');
        el = document.getElementById(elemid);
        if(el)
          el.scrollIntoView();
      }
  }
}
