import { TestBed } from "@angular/core/testing";

import { MatThemeService } from "./mat-theme.service";

describe("ThemeService", () => {
  let service: MatThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatThemeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
