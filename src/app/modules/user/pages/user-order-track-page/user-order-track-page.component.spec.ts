import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserOrderTrackPageComponent } from "./user-order-track-page.component";

describe("UserOrderTrackPageComponent", () => {
  let component: UserOrderTrackPageComponent;
  let fixture: ComponentFixture<UserOrderTrackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOrderTrackPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
