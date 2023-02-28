import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserInvoicesPageComponent } from "./user-invoices-page.component";

describe("UserInvoicesPageComponent", () => {
  let component: UserInvoicesPageComponent;
  let fixture: ComponentFixture<UserInvoicesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInvoicesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInvoicesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
