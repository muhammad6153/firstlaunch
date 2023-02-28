import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminInvoicesPageComponent } from "./admin-invoices-page.component";

describe("AdminInvoicesPageComponent", () => {
  let component: AdminInvoicesPageComponent;
  let fixture: ComponentFixture<AdminInvoicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminInvoicesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
