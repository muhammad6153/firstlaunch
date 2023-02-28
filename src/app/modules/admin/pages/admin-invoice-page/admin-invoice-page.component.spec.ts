import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminInvoicePageComponent } from "./admin-invoice-page.component";

describe("AdminInvoicePageComponent", () => {
  let component: AdminInvoicePageComponent;
  let fixture: ComponentFixture<AdminInvoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminInvoicePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
