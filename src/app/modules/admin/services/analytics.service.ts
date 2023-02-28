import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpCommonsService } from "@/app/services/http-commons.service";
import type { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import type { NetworkResponse } from "@/app/models/network-response";
import { environment } from "@/environments/environment";
import { map } from "rxjs/operators";
import { AnalyticsData } from "@modules/admin/analytics-data";

@Injectable({
  providedIn: null,
})
export class AnalyticsService {
  private readonly httpClient: HttpClient;
  private readonly httpCommons: HttpCommonsService;
  private readonly $data: BehaviorSubject<AnalyticsData>;

  constructor(httpClient: HttpClient, httpCommons: HttpCommonsService) {
    this.httpClient = httpClient;
    this.httpCommons = httpCommons;
    this.$data = new BehaviorSubject<AnalyticsData>(new AnalyticsData({}));
  }

  public data(): BehaviorSubject<AnalyticsData> {
    return this.$data;
  }

  public fetchAnalyticsData(): Observable<void> {
    return this.httpClient
      .get<NetworkResponse<AnalyticsData>>(
        `${environment.apiUrl}/admin/analytics`,
        { headers: this.httpCommons.httpHeaders() }
      )
      .pipe(
        map((res) => {
          this.$data.next(new AnalyticsData(res.data));
        })
      );
  }
}
