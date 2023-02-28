import { TestBed } from "@angular/core/testing";

import { HttpCommonsService } from "./http-commons.service";

describe("HttpCommonsService", () => {
  let service: HttpCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommonsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
