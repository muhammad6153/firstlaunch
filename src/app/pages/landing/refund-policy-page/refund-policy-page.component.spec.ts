import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RefundPolicyPageComponent } from "./refund-policy-page.component";

describe("RefundPolicyPageComponent", () => {
  let component: RefundPolicyPageComponent;
  let fixture: ComponentFixture<RefundPolicyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundPolicyPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPolicyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
