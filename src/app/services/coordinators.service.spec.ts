import { TestBed } from "@angular/core/testing";

import { CoordinatorsService } from "./coordinators.service";

describe("CoordinatorsService", () => {
  let service: CoordinatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinatorsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
