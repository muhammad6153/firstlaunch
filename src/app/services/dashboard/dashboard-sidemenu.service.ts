import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface SidemenuLink {
  title: string;
  href: string;
  icon: string;
}

@Injectable({
  providedIn: "root",
})
export class DashboardSidemenuService {
  private readonly $links: BehaviorSubject<SidemenuLink[]>;

  constructor() {
    this.$links = new BehaviorSubject<SidemenuLink[]>([]);
  }

  public get links(): BehaviorSubject<SidemenuLink[]> {
    return this.$links;
  }

  public appendLinks(link: SidemenuLink): void {
    if (this.linkExists(link) === -1) {
      this.$links.next([...this.$links.value, link]);
    }
  }

  private linkExists(link: SidemenuLink): number {
    return this.$links.value.findIndex(
      (x) =>
        x.title === link.title && x.href === link.href && x.icon === link.icon
    );
  }
}
