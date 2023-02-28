import { TestBed } from "@angular/core/testing";

import { ServiceOrderService } from "./service-order.service";

describe("ServiceOrderService", () => {
  let service: ServiceOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOrderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
