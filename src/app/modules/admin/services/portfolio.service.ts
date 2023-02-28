import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import type { NetworkResponse } from "@/app/models/network-response";
import { environment } from "@/environments/environment";
import { catchError, map, switchMap } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";
import { PortfolioItem } from "@/app/models/portfolio-item";
import { AwsService } from "@/app/services/aws.service";
import { v4 as uuid } from "uuid";

@Injectable({
  providedIn: null,
})
export class PortfolioService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;
  private readonly awsService: AwsService;
  private readonly $portfolioItems: BehaviorSubject<PortfolioItem[]>;

  constructor(
    httpClient: HttpClient,
    httpCommons: HttpCommonsService,
    awsService: AwsService
  ) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
    this.awsService = awsService;
    this.$portfolioItems = new BehaviorSubject<PortfolioItem[]>([]);
  }

  public portfolioItems(): BehaviorSubject<PortfolioItem[]> {
    return this.$portfolioItems;
  }

  public fetchPortfolioItems(): Observable<void> {
    return this.httpClient
      .get<NetworkResponse<PortfolioItem[]>>(
        `${environment.apiUrl}/portfolio`,
        {
          headers: this.httpCommons.httpHeaders(),
        }
      )
      .pipe(
        map((res) => {
          this.$portfolioItems.next(
            res.data.map((invoice) => new PortfolioItem(invoice))
          );
        })
      );
  }

  public fetchPortfolioItem(id: number): Observable<Nullish<PortfolioItem>> {
    return this.httpClient
      .get<NetworkResponse<Nullish<PortfolioItem>>>(
        `${environment.apiUrl}/admin/portfolio/${id}`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(
        map((res) => {
          if (res.data) {
            return new PortfolioItem(res.data);
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  public createPortfolioItem({ title, image }: any): Observable<unknown> {
    const imageKey = `public/assets/portfolio/${uuid()}.${image.name
      .split(".")
      .pop()}`;
    return this.awsService.uploadFile(image, imageKey).pipe(
      switchMap((imageUrl) => {
        return this.httpClient.post<NetworkResponse<unknown>>(
          `${environment.apiUrl}/admin/portfolio`,
          { title, imageUrl },
          { headers: this.httpCommons.httpHeaders() }
        );
      }),
      map((res) => res.data)
    );
  }

  public deletePortfolioItem(id: number): Observable<unknown> {
    return this.httpClient.delete<NetworkResponse<unknown>>(
      `${environment.apiUrl}/admin/portfolio/${id}`,
      { headers: this.httpCommons.httpHeaders() }
    );
  }
}
