import type { OnDestroy, OnInit } from "@angular/core";
import { Component } from "@angular/core";
import type { Subscription } from "rxjs";
import { AuthService } from "@/app/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly authService: AuthService;
  private readonly subscriptions: Subscription[];

  constructor(authService: AuthService) {
    this.subscriptions = [];
    this.authService = authService;
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authService.fetchCurrentUser().subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
