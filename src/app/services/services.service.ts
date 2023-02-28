import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import type { Service } from "@/app/models/service";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import type { Nullish } from "@/app/models/nullish";

@Injectable({
  providedIn: null,
})
export class ServicesService {
  private readonly httpClient: HttpClient;
  private readonly $services: BehaviorSubject<Service[]>;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.$services = new BehaviorSubject<Service[]>([]);
  }

  public get services(): BehaviorSubject<Service[]> {
    return this.$services;
  }

  public async fetchServices(): Promise<void> {
    if (!this.$services.value.length) {
      return this.httpClient
        .get<Service[]>("/assets/data/talent-track.json")
        .pipe(
          map((services) => {
            this.$services.next(services);
          })
        )
        .toPromise();
    }
  }

  public fetchService(name: string): Observable<Nullish<Service>> {
    return this.httpClient.get<Service[]>("/assets/data/talent-track.json").pipe(
      map((services) => {
        if (Array.isArray(services)) {
          return services.find((service) => service.name === name) ?? null;
        }
        return null;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
}
