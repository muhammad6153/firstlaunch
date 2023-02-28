import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PayInvoicePageComponent } from "./pay-invoice-page.component";

describe("PayInvoicePageComponent", () => {
  let component: PayInvoicePageComponent;
  let fixture: ComponentFixture<PayInvoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayInvoicePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayInvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
