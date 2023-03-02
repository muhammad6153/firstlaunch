import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import type { TalentTrack } from "@/app/models/talent-track";
import { TalentTrackService } from "@/app/services/talenttrack.service";
import type { Subscription } from "rxjs";

@Component({
  selector: "app-talent-track-cards",
  templateUrl: "./talent-track-cards.component.html",
  styleUrls: ["./talent-track-cards.component.scss"],
})
export class TalentTrackCardsComponent implements OnInit, OnDestroy {
  @Input()
  public plan!: string;

  private readonly TalentTrackService: TalentTrackService;

  public services: TalentTrack[];
  public subscription?: Subscription;

  constructor(TalentTrackService: TalentTrackService) {
    this.TalentTrackService = TalentTrackService;
    this.services = [];
  }

  public ngOnInit(): void {
    this.TalentTrackService.fetchServices();
    this.subscription = this.TalentTrackService.services.subscribe((services) => {
      this.services = services;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
