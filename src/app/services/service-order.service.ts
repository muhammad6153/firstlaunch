import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@/environments/environment";
import { Order } from "@/app/models/order";
import { HttpCommonsService } from "@/app/services/http-commons.service";

@Injectable({
  providedIn: "root",
})
export class ServiceOrderService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
  }

  public async submitServiceOrder(order: Order): Promise<void> {
    return this.httpClient
      .post<void>(`${environment.apiUrl}/orders`, order, {
        headers: this.httpCommons.httpHeaders(),
      })
      .toPromise();
  }
}
