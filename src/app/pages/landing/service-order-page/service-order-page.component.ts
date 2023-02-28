import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import type { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import type { FormGroup } from "@angular/forms";
import { ServiceOrderService } from "@/app/services/service-order.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DOCUMENT } from "@angular/common";
import { Nullish } from "@/app/models/nullish";
import { User } from "@/app/models/user";
import { AuthService } from "@/app/services/auth.service";

@Component({
  selector: "app-service-order-page",
  templateUrl: "./service-order-page.component.html",
  styleUrls: ["./service-order-page.component.scss"],
})
export class ServiceOrderPageComponent implements OnInit, OnDestroy {
  private readonly route: ActivatedRoute;
  private readonly httpClient: HttpClient;
  private readonly matSnackBar: MatSnackBar;
  private readonly router: Router;
  private readonly serviceOrderService: ServiceOrderService;
  private readonly authService: AuthService;
  public subscriptions: Subscription[];
  public plan: string;
  public service: string;
  public readonly minDataOfBirth: Date;
  public readonly maxDataOfBirth: Date;
  public countries: string[];
  public readonly form: FormGroup;
  public privacyPolicyAccepted: boolean;
  public user: Nullish<User>;

  constructor(
    @Inject(DOCUMENT) document: Document,
    route: ActivatedRoute,
    httpClient: HttpClient,
    matSnackBar: MatSnackBar,
    router: Router,
    formBuilder: FormBuilder,
    serviceOrderService: ServiceOrderService,
    authService: AuthService
  ) {
    document.title = "Place an order - First Launch";
    this.route = route;
    this.httpClient = httpClient;
    this.matSnackBar = matSnackBar;
    this.router = router;
    this.serviceOrderService = serviceOrderService;
    this.authService = authService;
    this.subscriptions = [];
    this.plan = "";
    this.service = "";
    this.countries = [];
    this.privacyPolicyAccepted = false;
    this.user = null;
    const currentYear = new Date().getFullYear();
    this.minDataOfBirth = new Date(currentYear - 60, 0, 0);
    this.maxDataOfBirth = new Date(currentYear - 18, 0, 0);
    this.form = formBuilder.group({
      // personal information...
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      dateOfBirth: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.min(18), Validators.max(60)]],
      phoneNumber: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required]],
      cityOrZipcode: ["", [Validators.required]],
      // Background...
      background: ["", [Validators.required]],
      // social media accounts...
      twitter: [""],
      youtube: [""],
      instagram: [""],
      tiktok: [""],
      snapchat: [""],
      facebook: [""],
      // experience & trials...
      experienceAndTrials: [""],
      // resume
      resume: [""],
      // picture
      picture: [""],
      // service === 'acting-talent'
      // Interests & Category...
      interestsAndCategory: formBuilder.group({
        filmAndTVActing: [false],
        commercialsActing: [false],
        drama: [false],
        theatreActing: [false],
        extraBackgroundActing: [false],
        comedy: [false],
        voiceOverActing: [false],
        classic: [false],
        others: [false],
      }),
      // service === 'influencers'
      // Interests & Field...
      interestsAndField: [""],
      // service === 'musical-talent'
      // Which instrument/s you play...
      instrumentsPlayed: [""],
      howLongInstrumentsPlayed: [""],
      // service === 'professional-models'
      // My dimensions as follows
      dimensions: formBuilder.group({
        gender: [""],
        height: [""],
        weight: [""],
        bustChest: [""],
        waist: [""],
        inseamOutseam: [""],
        dressOrSuitSize: [""],
        pantsSize: [""],
        shoeSize: [""],
      }),
      // service === 'voice-talent'
      // Voice Classification
      voiceClassification: formBuilder.group({
        range: [0],
        toneQuality: [0],
        intonation: [0],
        sightSinging: [0],
        melodyMemorization: [0],
        confidence: [0],
        overallRating: [0],
      }),
      // service === 'writing-talent'
      // Writing interests & category
      writingInterestsAndCategory: formBuilder.group({
        poetry: [false],
        drama: [false],
        scienceFiction: [false],
        songLyrics: [false],
        mystery: [false],
        nonfiction: [false],
        fantasy: [false],
        biography: [false],
        fiction: [false],
      }),
    });
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.plan = params.plan;
        this.service = params.service;
      })
    );
    this.subscriptions.push(
      this.httpClient
        .get<string[]>("/assets/data/countries.json")
        .subscribe((countries) => {
          this.countries = countries;
        })
    );
    this.subscriptions.push(
      this.authService.currentUser.subscribe((user) => {
        this.user = user;
        if (user) {
          this.form.patchValue({
            email: user.email,
            name: user.name,
            dateOfBirth: user.dateOfBirth,
            cityOrZipcode: user.cityOrZipcode,
            age: user.age,
            phoneNumber: user.phoneNumber,
            nationality: user.nationality,
            address: user.address,
            picture: user.profilePicture,
          });
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public allowedAges(): number[] {
    return Array.from(new Array(60 - 17).keys()).map((_, i) => i + 18);
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid && this.privacyPolicyAccepted) {
        this.form.disable();
        await this.serviceOrderService.submitServiceOrder({
          ...this.form.value,
          plan: this.plan,
          service: this.service,
        });
        this.matSnackBar.open("Order placed successfully!", "OK", {
          horizontalPosition: "start",
          panelClass: "bg-success",
          duration: 5000,
        });
        await this.router.navigate(["/user/orders"]);
      }
    } catch (err) {
      this.matSnackBar.open("Unable to place order, please try again!", "OK", {
        horizontalPosition: "start",
        panelClass: "bg-danger",
        duration: 5000,
      });
      console.log(err);
      this.form.enable();
    }
  }
}
