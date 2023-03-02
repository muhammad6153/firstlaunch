import { TestBed } from "@angular/core/testing";

import { TalentTrackService } from "./talenttrack.service";

describe("TalentTrackService", () => {
  let service: TalentTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalentTrackService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
