import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmSignupPageComponent } from "./confirm-signup-page.component";

describe("ConfirmSignupPageComponent", () => {
  let component: ConfirmSignupPageComponent;
  let fixture: ComponentFixture<ConfirmSignupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmSignupPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
