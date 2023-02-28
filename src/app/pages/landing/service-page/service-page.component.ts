import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { concatMap, map, tap } from "rxjs/operators";
import type { Service } from "@/app/models/service";
import { Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { MatThemeService } from "@/app/services/mat-theme.service";

@Component({
  selector: "app-service-page",
  templateUrl: "./service-page.component.html",
  styleUrls: ["./service-page.component.scss"],
})
export class ServicePageComponent implements OnInit, OnDestroy {
  private readonly httpClient: HttpClient;
  private readonly route: ActivatedRoute;
  private readonly document: Document;
  private readonly matThemeService: MatThemeService;
  public subscriptions: Subscription[];
  public service?: Service;
  public plan: string;
  public loading: boolean;
  public direction: string;

  constructor(
    @Inject(DOCUMENT) document: Document,
    route: ActivatedRoute,
    httpClient: HttpClient,
    matThemeService: MatThemeService
  ) {
    this.document = document;
    this.route = route;
    this.httpClient = httpClient;
    this.matThemeService = matThemeService;
    this.loading = true;
    this.plan = "";
    this.subscriptions = [];
    this.direction = "ltr";
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.queryParams
        .pipe(
          tap((params) => {
            this.plan = params.plan;
          })
        )
        .subscribe()
    );
    this.subscriptions.push(
      this.matThemeService.direction
        .pipe(
          tap((direction) => {
            this.direction = direction;
            this.matThemeService.loadServicePageStyle();
          })
        )
        .subscribe()
    );
    this.subscriptions.push(
      this.route.params
        .pipe(
          concatMap((params) => {
            return this.httpClient
              .get<Service[]>("/assets/data/services.json")
              .pipe(
                map((x) => x.find((service) => service.name === params.service))
              );
          })
        )
        .subscribe((service) => {
          this.setPageTitle(service);
          this.service = service;
          this.loading = false;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public routerLink(): string[] {
    if (this.plan && this.service) {
      return ["/service", this.service.name, "order", this.plan];
    }
    return ["/pricing", this.service?.name ?? ""];
  }

  private setPageTitle(service?: Service): void {
    const name = service?.name?.replace("-", " ") ?? "";
    const capitalizedName = name[0].toUpperCase() + name.slice(1, name.length);
    this.document.title = `${capitalizedName} - First Launch`;
  }

  public openShareLink(site: string): void {
    let shareUrl = encodeURIComponent(location.href);
    const title = encodeURIComponent(
      "Check out this service from First Launch"
    );
    if (site === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${title}`;
    } else if (site === "twitter") {
      shareUrl = `https://twitter.com/share?url=${shareUrl}&via=first_launch&text=${title}`;
    } else if (site === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${shareUrl}`;
    } else {
      return;
    }
    window.open(
      shareUrl,
      "",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
    );
  }
}
