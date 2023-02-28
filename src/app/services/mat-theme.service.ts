import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { BehaviorSubject } from "rxjs";

type ThemeVariant = "light" | "dark";
type DomDirection = "ltr" | "rtl";

@Injectable({
  providedIn: "root",
})
export class MatThemeService {
  private readonly document: Document;
  private readonly $direction: BehaviorSubject<DomDirection>;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.document = document;
    const dir = localStorage.getItem("lang") === "en" ? "ltr" : "rtl";
    this.$direction = new BehaviorSubject<DomDirection>(dir);
  }

  public get direction(): BehaviorSubject<DomDirection> {
    return this.$direction;
  }

  public get isDarkModeEnabled(): boolean {
    return MatThemeService.storedThemeVariant === "dark";
  }

  public toggleDarkMode(): void {
    this.loadTheme(this.isDarkModeEnabled ? "light" : "dark");
  }

  public loadCurrentTheme(): void {
    this.loadTheme(MatThemeService.storedThemeVariant);
  }

  private static get storedThemeVariant(): ThemeVariant {
    const variant = localStorage.getItem("mat-theme-variant");
    return variant === "light" ? variant : "dark";
  }

  private static set storedThemeVariant(theme: ThemeVariant) {
    localStorage.setItem("mat-theme-variant", theme);
  }

  private loadTheme(theme: ThemeVariant): void {
    const headEl = this.document.querySelector("head");

    let matThemeLink = this.document.querySelector<HTMLLinkElement>(
      "link#mat-theme"
    );

    const href =
      theme === "light"
        ? "assets/styles/light-theme.css"
        : "assets/styles/dark-theme.css";

    if (matThemeLink) {
      matThemeLink.href = href;
    } else {
      matThemeLink = this.document.createElement("link");
      matThemeLink.id = "mat-theme";
      matThemeLink.rel = "stylesheet";
      matThemeLink.href = href;
      headEl?.appendChild(matThemeLink);
    }
    MatThemeService.storedThemeVariant = theme;
  }

  public loadServicePageStyle(): void {
    const headEl = this.document.querySelector("head");

    let servicePageStyleLink = this.document.querySelector<HTMLLinkElement>(
      "link#service-page-styles"
    );

    const href =
      this.$direction.value === "ltr"
        ? "assets/styles/service-page-ltr.css"
        : "assets/styles/service-page-rtl.css";

    if (servicePageStyleLink) {
      servicePageStyleLink.href = href;
    } else {
      servicePageStyleLink = this.document.createElement("link");
      servicePageStyleLink.id = "service-page-styles";
      servicePageStyleLink.rel = "stylesheet";
      servicePageStyleLink.href = href;
      headEl?.appendChild(servicePageStyleLink);
    }
  }
}
