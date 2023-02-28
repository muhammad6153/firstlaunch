import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ServiceOrderPageComponent } from "./service-order-page.component";

describe("ServiceOrderPageComponent", () => {
  let component: ServiceOrderPageComponent;
  let fixture: ComponentFixture<ServiceOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceOrderPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
