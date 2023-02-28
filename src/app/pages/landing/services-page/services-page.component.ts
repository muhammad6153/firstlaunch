import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";
import type { Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-services-page",
  templateUrl: "./services-page.component.html",
  styleUrls: ["./services-page.component.scss"],
})
export class ServicesPageComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute;
  public subscription!: Subscription;
  public plan!: string;

  constructor(@Inject(DOCUMENT) document: Document, route: ActivatedRoute) {
    document.title = "Services - First Launch";
    this.route = route;
  }

  public ngOnInit(): void {
    this.subscription = this.route.queryParams
      .pipe(
        tap((params) => {
          this.plan = params.plan;
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
