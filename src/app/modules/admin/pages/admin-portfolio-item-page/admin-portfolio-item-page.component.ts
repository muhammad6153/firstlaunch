import { Component, OnDestroy, OnInit } from "@angular/core";
import { PortfolioService } from "@modules/admin/services/portfolio.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";
import type { PortfolioItem } from "@/app/models/portfolio-item";

@Component({
  selector: "app-admin-portfolio-item-page",
  templateUrl: "./admin-portfolio-item-page.component.html",
  styleUrls: ["./admin-portfolio-item-page.component.scss"],
})
export class AdminPortfolioItemPageComponent implements OnInit, OnDestroy {
  private readonly portfolioService: PortfolioService;
  private readonly route: ActivatedRoute;
  private readonly router: Router;
  private subscription: Subscription;
  private deleteRequestSubscription: Subscription;
  private portfolioItemSubject: BehaviorSubject<null>;
  public item: Nullish<PortfolioItem>;
  public loading: boolean;

  constructor(
    route: ActivatedRoute,
    router: Router,
    portfolioService: PortfolioService
  ) {
    this.route = route;
    this.router = router;
    this.portfolioService = portfolioService;
    this.subscription = Subscription.EMPTY;
    this.deleteRequestSubscription = Subscription.EMPTY;
    this.portfolioItemSubject = new BehaviorSubject(null);
    this.item = null;
    this.loading = true;
  }

  public ngOnInit(): void {
    this.subscription = this.portfolioItemSubject
      .pipe(
        switchMap(() => this.route.params),
        switchMap(({ id }) => this.portfolioService.fetchPortfolioItem(id))
      )
      .subscribe((item) => {
        this.item = item;
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.deleteRequestSubscription.unsubscribe();
  }

  public fetchData(): void {
    this.loading = true;
    this.portfolioItemSubject.next(null);
  }

  public deleteItem(): void {
    this.loading = true;
    this.deleteRequestSubscription = this.route.params
      .pipe(
        switchMap(({ id }) => this.portfolioService.deletePortfolioItem(id))
      )
      .subscribe(async () => {
        await this.router.navigate(["/admin/portfolio"]);
      });
  }
}
