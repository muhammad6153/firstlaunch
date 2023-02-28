import { Injectable } from "@angular/core";
import type {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  UrlTree,
} from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";
import { catchError, map, switchMap } from "rxjs/operators";
import type { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad, CanActivate {
  private readonly authService: AuthService;
  private readonly router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  public canLoad(): Observable<boolean | UrlTree> {
    return this.isAuthenticated(location.pathname);
  }

  public canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isAuthenticated(
      route.pathFromRoot
        .map((path) => path.url.map((segment) => segment.toString()).join("/"))
        .join("/")
    );
  }

  private isAuthenticated(redirectUrl: string): Observable<boolean | UrlTree> {
    return this.authService.currentUser.pipe(
      switchMap((currentUser) => {
        if (!!currentUser) {
          return of(true);
        }
        return this.authService.fetchCurrentUser().pipe(
          map((user) => {
            if (!user) {
              return this.router.createUrlTree(["/auth/login"], {
                queryParams: { redirectUrl },
              });
            }
            return true;
          }),
          catchError(() => of(false))
        );
      })
    );
  }
}
