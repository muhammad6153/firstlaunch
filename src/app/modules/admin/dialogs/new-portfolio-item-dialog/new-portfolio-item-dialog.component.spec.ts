import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewPortfolioItemDialogComponent } from "./new-portfolio-item-dialog.component";

describe("NewPortfolioItemDialogComponent", () => {
  let component: NewPortfolioItemDialogComponent;
  let fixture: ComponentFixture<NewPortfolioItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPortfolioItemDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPortfolioItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
