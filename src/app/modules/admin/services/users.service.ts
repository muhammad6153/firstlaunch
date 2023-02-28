import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import type { NetworkResponse } from "@/app/models/network-response";
import { environment } from "@/environments/environment";
import { catchError, map } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";
import { User } from "@/app/models/user";

@Injectable({
  providedIn: null,
})
export class UsersService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;
  private readonly $users: BehaviorSubject<User[]>;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
    this.$users = new BehaviorSubject<User[]>([]);
  }

  public users(): BehaviorSubject<User[]> {
    return this.$users;
  }

  public fetchUsers(): Observable<void> {
    return this.httpClient
      .get<NetworkResponse<User[]>>(`${environment.apiUrl}/admin/users`, {
        headers: this.httpCommons.httpHeaders(),
      })
      .pipe(
        map((res) => {
          this.$users.next(res.data.map((invoice) => new User(invoice)));
        })
      );
  }

  public fetchUser(id: number): Observable<Nullish<User>> {
    return this.httpClient
      .get<NetworkResponse<Nullish<User>>>(
        `${environment.apiUrl}/admin/users/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(
        map((res) => {
          if (res.data) {
            return new User(res.data);
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  public updateUser({ id, ...rest }: any): Observable<unknown> {
    return this.httpClient
      .put<NetworkResponse<unknown>>(
        `${environment.apiUrl}/admin/users/${id}`,
        rest,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(map((res) => res.data));
  }

  public deleteUser(uid: string): Observable<unknown> {
    return this.httpClient.delete<NetworkResponse<unknown>>(
      `${environment.apiUrl}/admin/users/${uid}`,
      { headers: this.httpCommons.httpHeaders() }
    );
  }
}
