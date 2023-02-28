import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminPortfolioPageComponent } from "./admin-portfolio-page.component";

describe("AdminPortfolioPageComponent", () => {
  let component: AdminPortfolioPageComponent;
  let fixture: ComponentFixture<AdminPortfolioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPortfolioPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortfolioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
