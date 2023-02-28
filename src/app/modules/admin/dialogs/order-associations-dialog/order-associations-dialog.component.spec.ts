import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderAssociationsDialogComponent } from "./order-associations-dialog.component";

describe("OrderAssociationsDialogComponent", () => {
  let component: OrderAssociationsDialogComponent;
  let fixture: ComponentFixture<OrderAssociationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderAssociationsDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAssociationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
