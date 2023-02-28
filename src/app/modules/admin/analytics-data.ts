export class AnalyticsData {
  public readonly users: AnalyticsRecord[];
  public readonly invoices: AnalyticsRecord[];
  public readonly orders: AnalyticsRecord[];

  constructor(data: Partial<AnalyticsData>) {
    this.users = (data.users ?? []).map(
      (record) => new AnalyticsRecord(record)
    );
    this.invoices = (data.invoices ?? []).map(
      (record) => new AnalyticsRecord(record)
    );
    this.orders = (data.orders ?? []).map(
      (record) => new AnalyticsRecord(record)
    );
  }

  public usersCounts(): number[] {
    return this.users.map(({ count }) => count);
  }

  public usersDates(): string[] {
    return this.users.map(({ date }) => date);
  }

  public ordersCounts(): number[] {
    return this.orders.map(({ count }) => count);
  }

  public ordersDates(): string[] {
    return this.orders.map(({ date }) => date);
  }

  public invoicesCounts(): number[] {
    return this.invoices.map(({ count }) => count);
  }

  public invoicesDates(): string[] {
    return this.invoices.map(({ date }) => date);
  }
}

export class AnalyticsRecord {
  public readonly count: number;
  public readonly date: string;

  constructor(record: Partial<AnalyticsRecord>) {
    this.count = record.count ?? 0;
    this.date = record.date ? new Date(record.date).toLocaleDateString() : "";
  }
}
