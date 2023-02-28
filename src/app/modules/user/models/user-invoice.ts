export class UserInvoice {
  public readonly id: number;
  public readonly orderId: number;
  public readonly amount: number;
  public readonly isPaid: boolean;
  public readonly currency: string;
  public readonly taxRate: number;
  public readonly creationDate: Date;
  public readonly description: string;
  public readonly publicId: string;

  constructor(invoice: Partial<UserInvoice>) {
    this.id = invoice.id || -1;
    this.orderId = invoice.orderId || -1;
    this.amount = invoice.amount || -1;
    this.isPaid = invoice.isPaid || false;
    this.currency = invoice.currency || "";
    this.taxRate = invoice.taxRate || 0;
    this.creationDate = new Date(invoice.creationDate || "");
    this.description = invoice.description || "";
    this.publicId = invoice.publicId || "";
  }
}
