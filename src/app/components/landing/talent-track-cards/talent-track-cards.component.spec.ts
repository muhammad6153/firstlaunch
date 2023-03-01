import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TalentTrackCardsComponent } from "./talent-track-cards.component";

describe("TalentTrackCardsComponent", () => {
  let component: TalentTrackCardsComponent;
  let fixture: ComponentFixture<TalentTrackCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentTrackCardsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentTrackCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
