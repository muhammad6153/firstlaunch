import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { PortfolioService } from "@/app/services/portfolio.service";
import { PortfolioItem } from "@/app/models/portfolio-item";
import type { Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { v4 as uuid } from "uuid";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

const flyersDir = "assets/images/flyers/";

const createInstaLikePost = (
  id: string,
  basename: string,
  size: number
): PortfolioItem[] =>
  Array(size)
    .fill(null)
    .map(
      (_, idx) =>
        new PortfolioItem({
          id: uuid() as any,
          title: `${id} - 0${idx}`,
          imageUrl: `${flyersDir}${basename}${idx + 1}.jpg`,
        })
    );

const flyers = [
  new PortfolioItem({
    id: uuid() as any,
    title: "Post 9",
    imageUrl: "assets/images/flyers/Official%20In%20the%20middle.mp4",
    type: "video",
  }),
  new PortfolioItem({
    id: uuid() as any,
    title: "Post 9",
    imageUrl: "assets/images/flyers/radhwan.mp4",
    type: "video",
  }),
  new PortfolioItem({
    id: uuid() as any,
    title: "Post 9",
    imageUrl: "assets/images/flyers/winner%20FHD.mp4",
    type: "video",
  }),
  ...createInstaLikePost("Post 8", "Post%208/after-edite-100_0", 9),
  ...createInstaLikePost("Post 7", "Post%207/post7-1_0", 9),
  ...createInstaLikePost("Post 6", "Post%206/post6-1_0", 6),
  ...createInstaLikePost("Post 5", "post%205/post5_0", 9),
  ...createInstaLikePost("Post 4", "Post%204/post4-_0", 9),
  ...createInstaLikePost("Post 3", "Post%203/post3-insta_0", 9),
  new PortfolioItem({
    id: uuid() as any,
    title: "Post 2",
    imageUrl: "assets/images/flyers/Post%202%20Videos/1_Yara.mp4",
    type: "video",
  }),
  new PortfolioItem({
    id: uuid() as any,
    title: "Post 2",
    imageUrl: "assets/images/flyers/Post%202%20Videos/2_Samt.mp4",
    type: "video",
  }),
  new PortfolioItem({
    id: uuid() as any,
    title: "Post 2",
    imageUrl: "assets/images/flyers/Post%202%20Videos/3_Marwan.mp4",
    type: "video",
  }),
  ...createInstaLikePost("Post 1", "Post%201/poster-2_0", 9),
  new PortfolioItem({
    id: uuid() as any,
    title: "Flyer Acting Talent Service",
    imageUrl: "assets/images/flyers/Flyer%20Acting%20Talent%20Service.jpg",
  }),
  new PortfolioItem({
    id: uuid() as any,
    title: "Flyer Musical Talent Service",
    imageUrl: "assets/images/flyers/Flyer%20Musical%20Talent%20Service.jpg",
  }),
  new PortfolioItem({
    id: uuid() as any,
    title: "Flyer Voice Talent Service",
    imageUrl: "assets/images/flyers/Flyer%20Voice%20Talent%20Service.jpg",
  }),
];

@Component({
  selector: "app-portfolio-page",
  templateUrl: "./portfolio-page.component.html",
  styleUrls: ["./portfolio-page.component.scss"],
})
export class PortfolioPageComponent implements OnInit, OnDestroy {
  private readonly portfolioService: PortfolioService;
  private itemsSubscription?: Subscription;
  public fetchingItems: boolean;
  public items: PortfolioItem[];
  public selectedItemId: number;

  constructor(
    @Inject(DOCUMENT) document: Document,
    portfolioService: PortfolioService,
    public dialog: MatDialog
  ) {
    document.title = "Portfolio - First Launch";
    this.portfolioService = portfolioService;
    this.fetchingItems = true;
    this.items = [...flyers];
    this.selectedItemId = -1;
  }

  public async ngOnInit(): Promise<void> {
    this.itemsSubscription = this.portfolioService.items.subscribe(
      this.handleItemsChanges.bind(this)
    );
    await this.portfolioService.fetchItems();
    this.fetchingItems = false;
  }

  public ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe();
  }

  private handleItemsChanges(items: PortfolioItem[]): void {
    this.items = [...flyers, ...items];
  }

  public visibleItems(): PortfolioItem[] {
    return this.items;
  }

  public openDialog(type: "image" | "video", src: string): void {
    this.dialog.open(type === "image" ? ImageDialog : VideoDialog, {
      data: src,
    });
  }
}

@Component({
  selector: "video-dialog",
  template: `
    <video
      class="d-block"
      style="max-width: 100%; max-height: 75vh"
      controls
      autoplay
    >
      <source [src]="src" type="video/mp4" />
    </video>
  `,
})
export class VideoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public src: string) {}
}

@Component({
  selector: "image-dialog",
  template: `
    <img
      class="d-block"
      style="max-width: 100%; max-height: 75vh"
      [src]="src"
    />
  `,
})
export class ImageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public src: string) {}
}
