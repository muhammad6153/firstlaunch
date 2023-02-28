import { Component, OnDestroy, OnInit } from "@angular/core";
import type { ChartDataSets } from "chart.js";
import type { Label } from "ng2-charts";
import { AnalyticsService } from "@modules/admin/services/analytics.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import type { AnalyticsData } from "@modules/admin/analytics-data";
import { AuthService } from "@/app/services/auth.service";
import { Nullish } from "@/app/models/nullish";
import { User, UserRole } from "@/app/models/user";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private readonly analyticsService: AnalyticsService;
  private subscriptions: Subscription[];
  private authService: AuthService;
  public user: Nullish<User>;

  public usersChartData: ChartDataSets[];
  public usersChartLabels: Label[];

  public ordersChartData: ChartDataSets[];
  public ordersChartLabels: Label[];

  public invoicesChartData: ChartDataSets[];
  public invoicesChartLabels: Label[];

  private dataLoader: BehaviorSubject<null>;
  public fetchingData: boolean;

  constructor(analyticsService: AnalyticsService, authService: AuthService) {
    this.analyticsService = analyticsService;
    this.authService = authService;
    this.user = null;
    this.subscriptions = [];
    this.usersChartData = [{ data: [], label: "Users Count" }];
    this.usersChartLabels = [];
    this.ordersChartData = [{ data: [], label: "Orders Count" }];
    this.ordersChartLabels = [];
    this.invoicesChartData = [{ data: [], label: "Invoices Count" }];
    this.invoicesChartLabels = [];
    this.dataLoader = new BehaviorSubject(null);
    this.fetchingData = true;
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.dataLoader
        .pipe(
          switchMap(() => this.analyticsService.fetchAnalyticsData()),
          switchMap(() => this.analyticsService.data())
        )
        .subscribe(this.handleSubscription.bind(this))
    );
    this.subscriptions.push(
      this.authService.currentUser.subscribe((user) => {
        this.user = user;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public fetchData(): void {
    this.fetchingData = true;
    this.dataLoader.next(null);
  }

  public isAdmin(): boolean {
    return this.user?.role === UserRole.Admin;
  }

  public isPartner(): boolean {
    return this.user?.role === UserRole.Partner;
  }

  public isCollaborator(): boolean {
    return this.user?.role === UserRole.Collaborator;
  }

  public isCoordinator(): boolean {
    return this.user?.role === UserRole.Coordinator;
  }

  private handleSubscription(data: AnalyticsData): void {
    this.usersChartData[0].data = data.usersCounts();
    this.usersChartLabels = data.usersDates();
    this.ordersChartData[0].data = data.ordersCounts();
    this.ordersChartLabels = data.ordersDates();
    this.invoicesChartData[0].data = data.invoicesCounts();
    this.invoicesChartLabels = data.invoicesDates();
    this.fetchingData = false;
  }
}
