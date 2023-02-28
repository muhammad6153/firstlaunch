import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OrderCommentsSectionComponent } from "./order-comments-section.component";

describe("OrderCommentsSectionComponent", () => {
  let component: OrderCommentsSectionComponent;
  let fixture: ComponentFixture<OrderCommentsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCommentsSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCommentsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
