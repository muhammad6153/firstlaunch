import { Injectable } from "@angular/core";
import { BehaviorSubject, of, throwError } from "rxjs";
import type { Observable } from "rxjs";
import { User } from "@/app/models/user";
import type { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment";
import { catchError, map, switchMap } from "rxjs/operators";
import type { LoginCredentials } from "@/app/models/login-credentials";
import type { NewUser } from "@/app/models/new-user";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import type { Nullish } from "@/app/models/nullish";
import type { NetworkResponse } from "@/app/models/network-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly httpClient: HttpClient;
  private readonly matSnackBar: MatSnackBar;
  private readonly router: Router;
  private readonly activatedRoute: ActivatedRoute;
  private readonly httpCommons: HttpCommonsService;
  private readonly $currentUser: BehaviorSubject<Nullish<User>>;

  constructor(
    httpClient: HttpClient,
    matSnackBar: MatSnackBar,
    router: Router,
    activatedRoute: ActivatedRoute,
    httpCommons: HttpCommonsService
  ) {
    this.httpClient = httpClient;
    this.matSnackBar = matSnackBar;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.httpCommons = httpCommons;
    this.$currentUser = new BehaviorSubject<Nullish<User>>(null);
  }

  private get httpOptions(): { headers: HttpHeaders } {
    return { headers: this.httpCommons.httpHeaders() };
  }

  private get httpRefreshSessionOptions(): { headers: HttpHeaders } {
    return { headers: this.httpCommons.httpRefreshSessionHeaders() };
  }

  public get currentUser(): BehaviorSubject<Nullish<User>> {
    return this.$currentUser;
  }

  public fetchCurrentUser(): Observable<Nullish<User>> {
    return this.currentUser.pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        }
        return this.reFetchCurrentUser();
      })
    );
  }

  public reFetchCurrentUser(): Observable<Nullish<User>> {
    const url = `${environment.apiUrl}/auth/me`;
    const options = this.httpRefreshSessionOptions;
    return this.httpClient
      .get<NetworkResponse<Nullish<User>>>(url, options)
      .pipe(map(this.handleGetUserResponse.bind(this)))
      .pipe(switchMap(this.handlePostLogin.bind(this)))
      .pipe(catchError(() => of(null)));
  }

  public async login(credentials: LoginCredentials): Promise<Nullish<User>> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.httpClient
      .post<NetworkResponse<Nullish<User>>>(url, credentials)
      .pipe(map(this.handleGetUserResponse.bind(this)))
      .pipe(switchMap(this.handlePostLogin.bind(this)))
      .pipe(catchError((err) => throwError(new Error(err.error.error))))
      .toPromise();
  }

  public async signup(newUser: NewUser): Promise<unknown> {
    const url = `${environment.apiUrl}/auth/signup`;
    return this.httpClient
      .post<NetworkResponse<unknown>>(url, newUser)
      .pipe(map((res) => res.data))
      .pipe(catchError((err) => throwError(new Error(err.error.error))))
      .toPromise();
  }

  public async sendPasswordRecoveryCode(data: {
    email: string;
  }): Promise<Nullish<User>> {
    const url = `${environment.apiUrl}/auth/signup`;
    return this.httpClient
      .post<Nullish<User>>(url, data, this.httpOptions)
      .toPromise();
  }

  public async confirmSignup(data: {
    email: string;
    confirmationCode: string;
  }): Promise<Nullish<User>> {
    const url = `${environment.apiUrl}/auth/confirm-signup`;
    return this.httpClient.post<Nullish<User>>(url, data).toPromise();
  }

  public async signOut(): Promise<void> {
    localStorage.removeItem("__acct");
    localStorage.removeItem("__rtkn");
    this.$currentUser.next(null);
    await this.router.navigateByUrl("/");
  }

  /** @internal */
  private handleGetUserResponse(
    res: NetworkResponse<Nullish<User>>
  ): Nullish<User> {
    if (res.data) {
      const { accessToken, refreshToken } = res.data;
      if (accessToken) {
        localStorage.setItem("__acct", accessToken);
      }
      if (refreshToken) {
        localStorage.setItem("__rtkn", refreshToken);
      }
      this.showGreetingFeedback(res.data.name);
      this.$currentUser.next(new User(res.data));
      return res.data;
    }
    return null;
  }

  /** @internal */
  private handlePostLogin(user: Nullish<User>): Observable<User | null> {
    return this.activatedRoute.queryParams
      .pipe(
        map(({ redirectUrl }) => this.router.navigateByUrl(redirectUrl || "/"))
      )
      .pipe(map(() => user));
  }

  /** @internal */
  private showGreetingFeedback(userName: string): void {
    this.matSnackBar.open(`Welcome back, ${userName}!`, "OK", {
      duration: 5000,
      horizontalPosition: "start",
      panelClass: "bg-success",
    });
  }
}
