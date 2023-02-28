import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserInvoicePageComponent } from "./user-invoice-page.component";

describe("UserInvoicePageComponent", () => {
  let component: UserInvoicePageComponent;
  let fixture: ComponentFixture<UserInvoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInvoicePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
