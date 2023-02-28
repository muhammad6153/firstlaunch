import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserOrderPageComponent } from "./user-order-page.component";

describe("UserOrderPageComponent", () => {
  let component: UserOrderPageComponent;
  let fixture: ComponentFixture<UserOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOrderPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
