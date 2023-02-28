import { Component, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-terms-page",
  templateUrl: "./terms-page.component.html",
  styleUrls: ["./terms-page.component.scss"],
})
export class TermsPageComponent {
  constructor(@Inject(DOCUMENT) document: Document) {
    document.title = "Terms of use - First Launch";
  }
}
