import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import type { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";

type Plan = "basic" | "express" | "super" | "premium";

@Component({
  selector: "app-pricing-page",
  templateUrl: "./pricing-page.component.html",
  styleUrls: ["./pricing-page.component.scss"],
})
export class PricingPageComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute;
  public subscription?: Subscription;
  public activePlan: Plan = "super";
  public serviceName: string;

  constructor(@Inject(DOCUMENT) document: Document, route: ActivatedRoute) {
    document.title = "Pricing - First Launch";
    this.route = route;
    this.serviceName = "";
  }

  public ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        tap((params) => {
          this.serviceName = params.service;
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public routerLink(plan: string): string[] {
    if (plan && this.serviceName && this.serviceName !== "general") {
      return ["/service", this.serviceName, "order", plan];
    }
    return ["/services"];
  }

  public queryParams(plan: string): Record<string, string> {
    if (!this.serviceName || this.serviceName === "general") {
      return { plan };
    }
    return {};
  }
}
