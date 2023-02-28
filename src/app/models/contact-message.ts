export class ContactMessage {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public readonly message: string;
  public readonly creationDate: string;

  constructor(msg: Partial<ContactMessage>) {
    this.id = msg.id ?? -1;
    this.name = msg.name ?? "";
    this.email = msg.email ?? "";
    this.message = msg.message ?? "";
    this.creationDate = msg.creationDate ?? "";
  }
}
