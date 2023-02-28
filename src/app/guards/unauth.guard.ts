import { Injectable } from "@angular/core";
import type { CanActivate, UrlTree } from "@angular/router";
import { CanLoad, Router } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";
import { catchError, map } from "rxjs/operators";
import type { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UnauthGuard implements CanLoad, CanActivate {
  private readonly authService: AuthService;
  private readonly router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public canLoad(): Observable<boolean | UrlTree> {
    return this.isAuthenticated();
  }

  public canActivate(): Observable<boolean | UrlTree> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean | UrlTree> {
    return this.authService.fetchCurrentUser().pipe(
      map((user) => {
        if (!!user) {
          return this.router.createUrlTree(["/"]);
        }
        return true;
      }),
      catchError(() => of(false))
    );
  }
}
