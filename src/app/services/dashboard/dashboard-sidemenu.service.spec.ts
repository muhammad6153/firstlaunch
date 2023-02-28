import { TestBed } from "@angular/core/testing";

import { DashboardSidemenuService } from "./dashboard-sidemenu.service";

describe("DashboardSidemenuService", () => {
  let service: DashboardSidemenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSidemenuService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
