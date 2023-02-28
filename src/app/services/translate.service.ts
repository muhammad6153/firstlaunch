import { Inject, Injectable } from "@angular/core";
import { MatThemeService } from "@/app/services/mat-theme.service";
import { TranslateService as NgxTranslateService } from "@ngx-translate/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class TranslateService {
  private readonly document: Document;
  private readonly matThemeService: MatThemeService;
  private readonly translateService: NgxTranslateService;

  constructor(
    @Inject(DOCUMENT) document: Document,
    matThemeService: MatThemeService,
    translateService: NgxTranslateService
  ) {
    this.document = document;
    this.matThemeService = matThemeService;
    this.translateService = translateService;
    translateService.setDefaultLang("ar");
    this.setLanguage(localStorage.getItem("lang") ?? "ar");
  }

  public setLanguage(lang: string): void {
    this.translateService.use(lang);
    localStorage.setItem("lang", lang);
    const html = this.document.querySelector("html");
    const dir = lang === "en" ? "ltr" : "rtl";
    if (html) {
      html.lang = lang;
      html.dir = dir;
    }
    this.matThemeService.direction.next(dir);
  }
}
