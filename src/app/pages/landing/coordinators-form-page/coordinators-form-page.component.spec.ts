import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CoordinatorsFormPageComponent } from "./coordinators-form-page.component";

describe("CoordinatorsFormPageComponent", () => {
  let component: CoordinatorsFormPageComponent;
  let fixture: ComponentFixture<CoordinatorsFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorsFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
