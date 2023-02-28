import OrderTrackComment from "@/app/models/order-track-comment";

export default class OrderTrack {
  public readonly id: number;
  public readonly currentStateIndicator: number;
  public readonly orderId: number;
  public readonly finalPackageLink: string;
  public readonly orderService: string;
  public readonly comments: OrderTrackComment[];

  constructor(track: Partial<OrderTrack>) {
    this.id = track.id ?? 0;
    this.currentStateIndicator = track.currentStateIndicator ?? 0;
    this.orderId = track.orderId ?? 0;
    this.finalPackageLink = track.finalPackageLink ?? "";
    this.orderService = track.orderService ?? "";
    this.comments = (Array.isArray(track.comments) ? track.comments : []).map(
      (comment) => new OrderTrackComment(comment)
    );
  }
}
