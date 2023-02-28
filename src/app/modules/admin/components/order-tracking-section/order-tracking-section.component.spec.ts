import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderTrackingSectionComponent } from "./order-tracking-section.component";

describe("OrderTrackingSectionComponent", () => {
  let component: OrderTrackingSectionComponent;
  let fixture: ComponentFixture<OrderTrackingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTrackingSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
