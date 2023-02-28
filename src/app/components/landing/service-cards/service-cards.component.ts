import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import type { Service } from "@/app/models/service";
import { ServicesService } from "@/app/services/services.service";
import type { Subscription } from "rxjs";

@Component({
  selector: "app-service-cards",
  templateUrl: "./service-cards.component.html",
  styleUrls: ["./service-cards.component.scss"],
})
export class ServiceCardsComponent implements OnInit, OnDestroy {
  @Input()
  public plan!: string;

  private readonly servicesService: ServicesService;

  public services: Service[];
  public subscription?: Subscription;

  constructor(servicesService: ServicesService) {
    this.servicesService = servicesService;
    this.services = [];
  }

  public ngOnInit(): void {
    this.servicesService.fetchServices();
    this.subscription = this.servicesService.services.subscribe((services) => {
      this.services = services;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
