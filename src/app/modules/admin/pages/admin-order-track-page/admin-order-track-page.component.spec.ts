import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminOrderTrackPageComponent } from "./admin-order-track-page.component";

describe("AdminOrderTrackPageComponent", () => {
  let component: AdminOrderTrackPageComponent;
  let fixture: ComponentFixture<AdminOrderTrackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOrderTrackPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
