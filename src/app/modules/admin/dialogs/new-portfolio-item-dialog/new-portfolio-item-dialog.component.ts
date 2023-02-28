import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PortfolioService } from "@modules/admin/services/portfolio.service";
import type { Nullish } from "@/app/models/nullish";

@Component({
  selector: "app-new-portfolio-item-dialog",
  templateUrl: "./new-portfolio-item-dialog.component.html",
  styleUrls: ["./new-portfolio-item-dialog.component.scss"],
})
export class NewPortfolioItemDialogComponent {
  private readonly dialogRef: MatDialogRef<unknown>;
  private readonly portfolioService: PortfolioService;
  public loading: boolean;
  public title: string;
  private image: Nullish<File>;

  constructor(
    dialogRef: MatDialogRef<unknown>,
    portfolioService: PortfolioService
  ) {
    this.dialogRef = dialogRef;
    this.portfolioService = portfolioService;
    this.loading = false;
    this.title = "";
    this.image = null;
  }

  public handleImageChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.image = target.files[0];
    }
  }

  public canSubmit(): boolean {
    return !!this.title && !!this.image;
  }

  public async submit(): Promise<void> {
    if (this.canSubmit()) {
      this.loading = true;
      await this.portfolioService
        .createPortfolioItem({
          title: this.title,
          image: this.image,
        })
        .toPromise();
      this.loading = false;
      this.dialogRef.close();
    }
  }
}
