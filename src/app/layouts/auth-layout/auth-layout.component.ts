import { Component, Inject } from "@angular/core";
import { MatThemeService } from "@/app/services/mat-theme.service";
import { TranslateService } from "@/app/services/translate.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-auth-layout",
  templateUrl: "./auth-layout.component.html",
  styleUrls: ["./auth-layout.component.scss"],
})
export class AuthLayoutComponent {
  public readonly matThemeService: MatThemeService;

  constructor(
    @Inject(DOCUMENT) document: Document,
    translateService: TranslateService,
    matThemeService: MatThemeService
  ) {
    this.matThemeService = matThemeService;
    this.matThemeService.loadCurrentTheme();
  }
}
