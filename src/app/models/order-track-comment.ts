export default class OrderTrackComment {
  public readonly id: number;
  public readonly orderTrackId: number;
  public readonly userName: string;
  public readonly creationDate: string;
  public readonly comment: string;
  public readonly attachments: string[];

  constructor(track: Partial<OrderTrackComment>) {
    this.id = track.id ?? 0;
    this.orderTrackId = track.orderTrackId ?? 0;
    this.userName = track.userName ?? "";
    this.creationDate = track.creationDate ?? "";
    this.comment = track.comment ?? "";
    this.attachments = track.attachments ?? [];
  }
}
