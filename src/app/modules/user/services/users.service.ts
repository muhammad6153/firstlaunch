import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import { map } from "rxjs/operators";
import { NetworkResponse } from "@/app/models/network-response";
import { environment } from "@/environments/environment";
import type { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
  }

  public updateUser(user: any): Observable<unknown> {
    return this.httpClient
      .put<NetworkResponse<unknown>>(`${environment.apiUrl}/users`, user, {
        headers: this.httpCommons.httpHeaders(),
      })
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
}
