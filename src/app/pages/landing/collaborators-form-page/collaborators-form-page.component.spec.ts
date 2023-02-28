import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CollaboratorsFormPageComponent } from "./collaborators-form-page.component";

describe("CollaboratorsFormPageComponent", () => {
  let component: CollaboratorsFormPageComponent;
  let fixture: ComponentFixture<CollaboratorsFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorsFormPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
