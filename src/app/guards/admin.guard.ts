import { Injectable } from "@angular/core";
import type { CanActivate, UrlTree } from "@angular/router";
import { ActivatedRouteSnapshot, CanLoad, Router } from "@angular/router";
import { AuthService } from "@/app/services/auth.service";
import { catchError, map, switchMap } from "rxjs/operators";
import type { Observable } from "rxjs";
import { User, UserRole } from "@/app/models/user";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanLoad, CanActivate {
  private readonly authService: AuthService;
  private readonly router: Router;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  private static hasAuthorizedRole(user: User): boolean {
    return (
      user.role === UserRole.Admin ||
      user.role === UserRole.Collaborator ||
      user.role === UserRole.Coordinator ||
      user.role === UserRole.Partner
    );
  }

  public canLoad(): Observable<boolean | UrlTree> {
    return this.isAuthorized(location.pathname);
  }

  public canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isAuthorized(
      route.pathFromRoot
        .map((path) => path.url.map((segment) => segment.toString()).join("/"))
        .join("/")
    );
  }

  private isAuthorized(redirectUrl: string): Observable<boolean | UrlTree> {
    return this.authService.currentUser.pipe(
      switchMap((currentUser) => {
        if (!!currentUser && AdminGuard.hasAuthorizedRole(currentUser)) {
          return of(true);
        }
        return this.authService.fetchCurrentUser().pipe(
          map((user) => {
            if (!user) {
              return this.router.createUrlTree(["/auth/login"], {
                queryParams: { redirectUrl },
              });
            } else if (!AdminGuard.hasAuthorizedRole(user)) {
              return this.router.createUrlTree(["/"]);
            }
            return true;
          }),
          catchError(() => of(false))
        );
      })
    );
  }
}
