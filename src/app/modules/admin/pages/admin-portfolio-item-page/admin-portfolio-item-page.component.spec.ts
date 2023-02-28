import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminPortfolioItemPageComponent } from "./admin-portfolio-item-page.component";

describe("AdminPortfolioItemPageComponent", () => {
  let component: AdminPortfolioItemPageComponent;
  let fixture: ComponentFixture<AdminPortfolioItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPortfolioItemPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPortfolioItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
