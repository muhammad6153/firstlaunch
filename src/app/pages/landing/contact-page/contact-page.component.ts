import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ContactService } from "@/app/services/contact.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import type { AbstractControl, FormGroup } from "@angular/forms";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-contact-page",
  templateUrl: "./contact-page.component.html",
  styleUrls: ["./contact-page.component.scss"],
})
export class ContactPageComponent {
  public readonly form: FormGroup;

  constructor(
    @Inject(DOCUMENT) document: Document,
    formBuilder: FormBuilder,
    private readonly contactService: ContactService,
    private readonly matSnackBar: MatSnackBar
  ) {
    document.title = "Contact Us - First Launch";
    this.form = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required, Validators.minLength(2)]],
      message: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1024),
        ],
      ],
    });
  }

  public get name(): AbstractControl {
    return this.form.get("name") as AbstractControl;
  }

  public get email(): AbstractControl {
    return this.form.get("email") as AbstractControl;
  }

  public get message(): AbstractControl {
    return this.form.get("message") as AbstractControl;
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid) {
        this.form.disable();
        await this.contactService.creatMessage(this.form.value);
        this.showSuccessMessageAfterSubmit();
        this.form.enable();
        this.form.reset();
      }
    } catch (err) {
      console.log(err);
      this.showErrorMessageAfterSubmit();
      this.form.enable();
    }
  }

  private showSuccessMessageAfterSubmit(): void {
    this.matSnackBar.open(
      "Message sent successfully, our representative will get in touch with you shortly!",
      "OK",
      {
        duration: 5000,
        horizontalPosition: "start",
        panelClass: "bg-success",
      }
    );
  }

  private showErrorMessageAfterSubmit(): void {
    this.matSnackBar.open("Unable to send message, please try again!", "OK", {
      duration: 5000,
      horizontalPosition: "start",
      panelClass: "bg-danger",
    });
  }

  public openShareLink(site: string): void {
    let shareUrl = encodeURIComponent(location.href);
    const title = encodeURIComponent(
      "I found First Launch very interesting check it out"
    );
    if (site === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${title}`;
    } else if (site === "twitter") {
      shareUrl = `https://twitter.com/share?url=${shareUrl}&via=first_launch&text=${title}`;
    } else if (site === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${shareUrl}`;
    } else {
      return;
    }
    window.open(
      shareUrl,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
    );
  }
}
