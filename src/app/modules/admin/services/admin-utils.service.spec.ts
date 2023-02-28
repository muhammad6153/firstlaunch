import { TestBed } from "@angular/core/testing";

import { AdminUtilsService } from "./admin-utils.service";

describe("AdminUtilsService", () => {
  let service: AdminUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUtilsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
