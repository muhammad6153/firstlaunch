import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import type { Service } from "@/app/models/service";
import { ServicesService } from "@/app/services/services.service";
import type { Subscription } from "rxjs";

@Component({
  selector: 'app-services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.scss']
})
export class ServicesCardComponent implements OnInit {
  @Input()
  public plan!: string;

  private readonly ServicesService: ServicesService;

  public services: Service[];
  public subscription?: Subscription;

  constructor(ServicesService: ServicesService) {
    this.ServicesService = ServicesService;
    this.services = [];
  }

  public ngOnInit(): void {
    this.ServicesService.fetchServices();
    this.subscription = this.ServicesService.services.subscribe((services) => {
      this.services = services;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
