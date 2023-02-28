import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import type { FormGroup } from "@angular/forms";
import { FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "@/app/services/auth.service";
import { forkJoin, Observable, of, Subscription } from "rxjs";
import { Nullish } from "@/app/models/nullish";
import { User } from "@/app/models/user";
import { Router } from "@angular/router";
import { CoordinatorsService } from "@/app/services/coordinators.service";
import { AwsService } from "@/app/services/aws.service";
import { v4 as uuid } from "uuid";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-coordinators-form-page",
  templateUrl: "./coordinators-form-page.component.html",
  styleUrls: ["./coordinators-form-page.component.scss"],
})
export class CoordinatorsFormPageComponent implements OnInit, OnDestroy {
  public readonly form: FormGroup;
  private readonly httpClient: HttpClient;
  private readonly matSnackBar: MatSnackBar;
  private readonly authService: AuthService;
  private readonly coordinatorsService: CoordinatorsService;
  private readonly awsService: AwsService;
  private readonly router: Router;
  public readonly subscriptions: Subscription[];
  public readonly minDataOfBirth: Date;
  public readonly maxDataOfBirth: Date;
  public countries: string[];
  public privacyPolicyAccepted: boolean;
  public user: Nullish<User>;

  constructor(
    @Inject(DOCUMENT) document: Document,
    fb: FormBuilder,
    httpClient: HttpClient,
    matSnackBar: MatSnackBar,
    authService: AuthService,
    coordinatorsService: CoordinatorsService,
    router: Router,
    awsService: AwsService
  ) {
    document.title = "Coordinator Application - First Launch";
    this.httpClient = httpClient;
    this.authService = authService;
    this.matSnackBar = matSnackBar;
    this.coordinatorsService = coordinatorsService;
    this.router = router;
    this.awsService = awsService;
    this.subscriptions = [];
    this.countries = [];
    this.privacyPolicyAccepted = false;
    this.user = null;
    const currentYear = new Date().getFullYear();
    this.minDataOfBirth = new Date(currentYear - 60, 0, 0);
    this.maxDataOfBirth = new Date(currentYear - 18, 0, 0);
    this.form = fb.group({
      // account information...
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.min(18), Validators.max(60)]],
      phoneNumber: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
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
      // resume
      resume: ["", [Validators.required]],
      // profilePicture
      profilePicture: ["", [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.httpClient
        .get<string[]>("/assets/data/countries.json")
        .subscribe((countries) => {
          this.countries = countries;
        })
    );
    this.subscriptions.push(
      this.authService.currentUser.subscribe((user) => {
        if (user) {
          this.authService.signOut();
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

  public handlePictureChange(target: EventTarget | null): void {
    const files = (target as HTMLInputElement).files || [];
    if (files.length) {
      this.form.patchValue({ profilePicture: files[0] });
    }
  }

  public handleResumeChange(target: EventTarget | null): void {
    const files = (target as HTMLInputElement).files || [];
    if (files.length) {
      this.form.patchValue({ resume: files[0] });
    }
  }

  public async handleSubmit(): Promise<void> {
    try {
      if (this.form.valid && this.privacyPolicyAccepted) {
        this.form.disable();
        await this.joinUploads()
          .pipe(
            switchMap(({ profilePicture, resume }) => {
              const patchedValues = {
                ...this.form.value,
                profilePicture,
                resume,
              };
              return this.coordinatorsService.registerCoordinator(
                patchedValues
              );
            })
          )
          .toPromise();
        this.matSnackBar.open("Account created successfully!", "OK", {
          horizontalPosition: "start",
          panelClass: "bg-success",
          duration: 5000,
        });
        await this.router.navigate(["/auth/login"], {
          queryParams: { redirectUrl: "/coordinator" },
        });
      }
    } catch (err) {
      this.matSnackBar.open(
        "Unable create an account, please try again!",
        "OK",
        {
          horizontalPosition: "start",
          panelClass: "bg-danger",
          duration: 5000,
        }
      );
      console.log(err);
      this.form.enable();
    }
  }

  private joinUploads(): Observable<{
    resume: string;
    profilePicture: string;
  }> {
    const uploads = {
      resume: of(this.form.get("resume")?.value),
      profilePicture: of(this.form.get("profilePicture")?.value),
    };
    if (this.form.get("profilePicture")?.value) {
      const file = this.form.get("profilePicture")?.value;
      const imageKey = `public/coordinators/pic___${uuid()}___${file.name}`;
      uploads.profilePicture = this.awsService.uploadFile(file, imageKey);
    }
    if (this.form.get("resume")?.value) {
      const file = this.form.get("resume")?.value;
      const imageKey = `public/coordinators/cv___${uuid()}___${file.name}`;
      uploads.resume = this.awsService.uploadFile(file, imageKey);
    }
    return forkJoin(uploads);
  }
}
