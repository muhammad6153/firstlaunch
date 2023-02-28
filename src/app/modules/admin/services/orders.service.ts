import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import type { Observable } from "rxjs";
import { BehaviorSubject, of } from "rxjs";
import type { NetworkResponse } from "@/app/models/network-response";
import { environment } from "@/environments/environment";
import { catchError, map } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";
import { UserOrder } from "@modules/user/models/user-order";
import OrderTrack from "@/app/models/order-track";
import type OrderTrackComment from "@/app/models/order-track-comment";

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

  public fetchOrders(): Observable<void> {
    return this.httpClient
      .get<NetworkResponse<UserOrder[]>>(`${environment.apiUrl}/orders/all`, {
        headers: this.httpCommons.httpHeaders(),
      })
      .pipe(
        map((res) =>
          this.$orders.next(res.data.map((invoice) => new UserOrder(invoice)))
        )
      );
  }

  public fetchOrder(id: number): Observable<Nullish<UserOrder>> {
    return this.httpClient
      .get<NetworkResponse<Nullish<UserOrder>>>(
        `${environment.apiUrl}/admin/orders/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(map((res) => (res.data ? new UserOrder(res.data) : null)))
      .pipe(catchError(() => of(null)));
  }

  public updateOrderState(id: number, state: number): Observable<unknown> {
    const url = `${environment.apiUrl}/admin/orders/${id}/update-state`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient.post(url, { state }, options);
  }

  public addOrderComment(comment: any): Observable<unknown> {
    const url = `${environment.apiUrl}/admin/orders/comments`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient.post<unknown>(url, comment, options);
  }

  public fetchOrderComments(id: number): Observable<unknown[]> {
    const url = `${environment.apiUrl}/admin/orders/${id}/comments`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient
      .get<NetworkResponse<unknown[]>>(url, options)
      .pipe(map((res) => res.data));
  }

  public fetchOrderTrack(id: number): Observable<Nullish<OrderTrack>> {
    if (id <= 0) {
      return of(null);
    }
    return this.httpClient
      .get<NetworkResponse<Nullish<OrderTrack>>>(
        `${environment.apiUrl}/orders/track/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(map((res) => (res.data ? new OrderTrack(res.data) : null)))
      .pipe(catchError(() => of(null)));
  }

  public addOrderTrackComment(
    trackId: number,
    comment: Partial<OrderTrackComment>
  ): Observable<unknown> {
    const url = `${environment.apiUrl}/orders/track/${trackId}/comments`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient.post<unknown>(url, comment, options);
  }

  public assignUsersToOrder(associations: any[]): Observable<unknown> {
    const url = `${environment.apiUrl}/admin/assign-user-to-order`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient.post<unknown>(url, associations, options);
  }

  public removeUsersToOrder(associations: any[]): Observable<unknown> {
    const url = `${environment.apiUrl}/admin/remove-user-from-order`;
    const options = { headers: this.httpCommons.httpHeaders() };
    return this.httpClient.post<unknown>(url, associations, options);
  }
}
