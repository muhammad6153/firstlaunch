export class PaymentMethod {
  public cardHolder: string;
  public pan: string;
  public cvv: string;
  public expiryYear: number;
  public expiryMonth: number;

  constructor(pm: Partial<PaymentMethod>) {
    this.cardHolder = pm.cardHolder ?? "";
    this.pan = pm.pan ?? "";
    this.cvv = pm.cvv ?? "";
    this.expiryYear = Number(pm.expiryYear);
    this.expiryMonth = Number(pm.expiryMonth);
  }
}
