import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { UserInvoice } from "@modules/user/models/user-invoice";
import type { NetworkResponse } from "@/app/models/network-response";
import { environment } from "@/environments/environment";
import { catchError, map } from "rxjs/operators";
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
      .get<NetworkResponse<UserInvoice[]>>(
        `${environment.apiUrl}/invoices/all`,
        {
          headers: this.httpCommons.httpHeaders(),
        }
      )
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
        `${environment.apiUrl}/admin/invoices/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(
        map((res) => {
          if (res.data) {
            return new UserInvoice(res.data);
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  public updateInvoiceState(id: number): Observable<unknown> {
    return this.httpClient.post<NetworkResponse<unknown>>(
      `${environment.apiUrl}/admin/invoices/${id}`,
      {},
      { headers: this.httpCommons.httpHeaders() }
    );
  }
}
