import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { environment } from "@/environments/environment";
import { catchError, map } from "rxjs/operators";
import { UserInvoice } from "@modules/user/models/user-invoice";
import type { NetworkResponse } from "@/app/models/network-response";
import type { Nullish } from "@/app/models/nullish";

@Injectable({
  providedIn: null,
})
export class InvoicesService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;
  private readonly $invoices: BehaviorSubject<UserInvoice[]>;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
    this.$invoices = new BehaviorSubject<UserInvoice[]>([]);
  }

  public invoices(): BehaviorSubject<UserInvoice[]> {
    return this.$invoices;
  }

  public fetchInvoices(): Observable<void> {
    return this.httpClient
      .get<NetworkResponse<UserInvoice[]>>(`${environment.apiUrl}/invoices`, {
        headers: this.httpCommons.httpHeaders(),
      })
      .pipe(
        map((res) => {
          this.$invoices.next(
            res.data.map((invoice) => new UserInvoice(invoice))
          );
        })
      );
  }

  public fetchInvoice(id: number): Observable<Nullish<UserInvoice>> {
    return this.httpClient
      .get<NetworkResponse<Nullish<UserInvoice>>>(
        `${environment.apiUrl}/invoices/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(
        map((res) => {
          if (res.data) {
            return new UserInvoice(res.data);
          }
          return null;
        }),
        catchError(() => {
          return of(null);
        })
      );
  }

  public payInvoice(id: number): Observable<Record<string, unknown>> {
    return this.httpClient
      .post<NetworkResponse<Record<string, unknown>>>(
        `${environment.apiUrl}/payments/${id}`,
        {},
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(map((res) => res.data));
  }
}
