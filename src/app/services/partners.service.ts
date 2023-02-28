import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import { environment } from "@/environments/environment";
import { NetworkResponse } from "@/app/models/network-response";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PartnersService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
  }

  private get httpOptions(): { headers: HttpHeaders } {
    return { headers: this.httpCommons.httpHeaders() };
  }

  public registerPartner(partner: unknown): Observable<unknown> {
    const url = `${environment.apiUrl}/partners/register`;
    return this.httpClient
      .post<NetworkResponse<unknown>>(url, partner, this.httpOptions)
      .pipe(map((res) => res.data))
      .pipe(catchError((err) => throwError(new Error(err.error.error))));
  }
}
