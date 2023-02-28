import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PartnershipFormPageComponent } from "./partnership-form-page.component";

describe("PartnershipFormPageComponent", () => {
  let component: PartnershipFormPageComponent;
  let fixture: ComponentFixture<PartnershipFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartnershipFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
