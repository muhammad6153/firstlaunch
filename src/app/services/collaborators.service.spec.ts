import { TestBed } from "@angular/core/testing";

import { CollaboratorsService } from "./collaborators.service";

describe("CollaboratorsService", () => {
  let service: CollaboratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaboratorsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
