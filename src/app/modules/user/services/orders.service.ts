import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import { environment } from "@/environments/environment";
import { catchError, map } from "rxjs/operators";
import { UserOrder } from "@modules/user/models/user-order";
import type { Nullish } from "@/app/models/nullish";
import type { NetworkResponse } from "@/app/models/network-response";
import OrderTrack from "@/app/models/order-track";

@Injectable({
  providedIn: null,
})
export class OrdersService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;
  private readonly $orders: BehaviorSubject<UserOrder[]>;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
    this.$orders = new BehaviorSubject<UserOrder[]>([]);
  }

  public orders(): BehaviorSubject<UserOrder[]> {
    return this.$orders;
  }

  public fetchOrder(id: number): Observable<Nullish<UserOrder>> {
    if (id === -1) {
      return of(null);
    }
    return this.httpClient
      .get<NetworkResponse<Nullish<UserOrder>>>(
        `${environment.apiUrl}/orders/${id}`,
        {
          headers: this.httpCommons.httpHeaders(),
        }
      )
      .pipe(
        map((res) => {
          if (res.data) {
            return new UserOrder(res.data);
          }
          return null;
        }),
        catchError(() => {
          return of(null);
        })
      );
  }

  public fetchOrders(): Observable<void> {
    return this.httpClient
      .get<NetworkResponse<UserOrder[]>>(`${environment.apiUrl}/orders`, {
        headers: this.httpCommons.httpHeaders(),
      })
      .pipe(
        map((res) => {
          this.$orders.next(res.data.map((order) => new UserOrder(order)));
        })
      );
  }

  public fetchOrderTrack(id: number): Observable<Nullish<OrderTrack>> {
    if (id === -1) {
      return of(null);
    }
    return this.httpClient
      .get<NetworkResponse<Nullish<OrderTrack>>>(
        `${environment.apiUrl}/orders/track/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(
        map((res) => {
          if (res.data) {
            return new OrderTrack(res.data);
          }
          return null;
        }),
        catchError(() => {
          return of(null);
        })
      );
  }

  public addOrderTrackComment(id: number, comment: any): Observable<unknown> {
    const url = `${environment.apiUrl}/orders/track/${id}/comments`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient.post<unknown>(url, comment, options);
  }
}
