import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "@/environments/environment";
import { PortfolioItem } from "@/app/models/portfolio-item";
import type { NetworkResponse } from "@/app/models/network-response";

@Injectable({
  providedIn: "root",
})
export class PortfolioService {
  private readonly httpClient: HttpClient;
  private readonly $items: BehaviorSubject<PortfolioItem[]>;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.$items = new BehaviorSubject<PortfolioItem[]>([]);
  }

  public get items(): BehaviorSubject<PortfolioItem[]> {
    return this.$items;
  }

  public async fetchItems(): Promise<unknown> {
    return this.httpClient
      .get<NetworkResponse<PortfolioItem[]>>(`${environment.apiUrl}/portfolio`)
      .pipe(
        tap((res) =>
          this.$items.next(
            res.data.map((invoice) => new PortfolioItem(invoice))
          )
        )
      )
      .toPromise();
  }
}
