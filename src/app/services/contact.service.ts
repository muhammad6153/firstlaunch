import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "@/environments/environment";
import { tap } from "rxjs/operators";
import type { ContactMessage } from "@/app/models/contact-message";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private readonly httpClient: HttpClient;
  private readonly $messages: BehaviorSubject<ContactMessage[]>;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.$messages = new BehaviorSubject<ContactMessage[]>([]);
  }

  public get messages(): BehaviorSubject<ContactMessage[]> {
    return this.$messages;
  }

  public async creatMessage(message: ContactMessage): Promise<unknown> {
    return this.httpClient
      .post(`${environment.apiUrl}/contact`, message)
      .toPromise();
  }

  public async fetchMessages(): Promise<ContactMessage[]> {
    return this.httpClient
      .get<ContactMessage[]>(`${environment.apiUrl}/contact`)
      .pipe(tap((messages) => this.$messages.next(messages)))
      .toPromise();
  }
}
