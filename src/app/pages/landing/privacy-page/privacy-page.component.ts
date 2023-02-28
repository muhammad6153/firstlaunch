import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-privacy-page",
  templateUrl: "./privacy-page.component.html",
  styleUrls: ["./privacy-page.component.scss"],
})
export class PrivacyPageComponent {
  constructor(@Inject(DOCUMENT) document: Document) {
    document.title = "First Launch";
  }
}
