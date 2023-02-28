import { Component, Input, OnInit } from "@angular/core";
import type OrderTrackComment from "@/app/models/order-track-comment";

@Component({
  selector: "app-comment-card",
  templateUrl: "./comment-card.component.html",
  styleUrls: ["./comment-card.component.scss"],
})
export class CommentCardComponent implements OnInit {
  @Input()
  public comment!: OrderTrackComment;

  constructor() {}

  public ngOnInit(): void {}

  public avatarUrl(username: string): string {
    return `url(https://ui-avatars.com/api/?name=${encodeURIComponent(
      username
    )})`;
  }

  public attachmentName(url: string): string {
    return url.split("___").pop()?.split("?")?.shift() || "";
  }
}
