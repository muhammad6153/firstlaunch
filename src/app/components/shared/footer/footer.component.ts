import { Component } from "@angular/core";
import { MatThemeService } from "@/app/services/mat-theme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  public readonly year: number;

  constructor(
    public readonly matThemeService: MatThemeService,
    sanitizer: DomSanitizer,
    iconRegistry: MatIconRegistry
  ) {
    this.year = new Date().getFullYear();
    iconRegistry.addSvgIcon(
      "facebook",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/social-media/facebook.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "instagram",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/social-media/instagram.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "twitter",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/social-media/twitter.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "whatsapp",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/social-media/whatsapp.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "youtube",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/icons/social-media/youtube.svg"
      )
    );
  }
}
