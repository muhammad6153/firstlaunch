export class PortfolioItem {
  public readonly id: number;
  public readonly title: string;
  public readonly imageUrl: string;
  public readonly creationDate: string;
  public readonly categories: string[];
  public readonly type: "image" | "video";

  constructor(item: Partial<PortfolioItem>) {
    this.id = item.id ?? -1;
    this.title = item.title ?? "";
    this.imageUrl = item.imageUrl ?? "";
    this.creationDate = item.creationDate ?? "";
    this.categories = item.categories ?? [];
    this.type = item.type || "image";
  }
}
