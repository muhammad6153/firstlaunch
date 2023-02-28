import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AuthService } from "@/app/services/auth.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { User } from "@/app/models/user";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from "@modules/user/services/users.service";
import type { Nullish } from "@/app/models/nullish";
import {
  AgeValidator,
  NameValidator,
} from "@/app/validators/common-validators";
import { switchMap } from "rxjs/operators";
import { AwsService } from "@/app/services/aws.service";
import { v4 as uuid } from "uuid";

@Component({
  selector: "app-user-profile-page",
  templateUrl: "./user-profile-page.component.html",
  styleUrls: ["./user-profile-page.component.scss"],
})
export class UserProfilePageComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private readonly authService: AuthService;
  private readonly usersService: UsersService;
  private readonly awsService: AwsService;
  private readonly formBuilder: FormBuilder;
  private readonly reader: FileReader;

  private readonly fetchUserSubject: BehaviorSubject<null>;

  private userSubscription: Subscription;

  public readonly minDataOfBirth: Date;
  public readonly maxDataOfBirth: Date;
  public form!: FormGroup;

  public user: Nullish<User>;
  public profilePicture: Nullish<File>;
  public profilePictureChanged: boolean;

  @ViewChild("profilePicture")
  private readonly profilePictureRef!: ElementRef<HTMLImageElement>;

  constructor(
    authService: AuthService,
    usersService: UsersService,
    awsService: AwsService,
    formBuilder: FormBuilder
  ) {
    this.usersService = usersService;
    this.authService = authService;
    this.awsService = awsService;
    this.formBuilder = formBuilder;
    this.fetchUserSubject = new BehaviorSubject<null>(null);
    this.userSubscription = Subscription.EMPTY;
    this.reader = new FileReader();
    this.user = null;
    const currentYear = new Date().getFullYear();
    this.minDataOfBirth = new Date(currentYear - 60, 0, 0);
    this.maxDataOfBirth = new Date(currentYear - 18, 0, 0);
    this.profilePicture = null;
    this.profilePictureChanged = false;
    this.initializeForm();
  }

  public ngOnInit(): void {
    this.userSubscription = this.fetchUserSubject
      .pipe(switchMap(() => this.authService.fetchCurrentUser()))
      .subscribe(this.handleSubscription.bind(this));
  }

  public ngAfterViewInit(): void {}

  public ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  public async handleSubmit(): Promise<void> {
    this.form.disable();
    if (this.profilePicture) {
      const ext = this.profilePicture.name.split(".").pop();
      const imageKey = `public/user/profile/picture/${uuid()}.${ext}`;
      await this.awsService
        .uploadFile(this.profilePicture, imageKey)
        .pipe(
          switchMap((profilePicture) =>
            this.usersService.updateUser(
              new User({
                ...this.form.value,
                profilePicture,
              })
            )
          )
        )
        .toPromise()
        .finally(() => {
          this.form.enable();
          this.fetchUser();
        });
    }
  }

  public handleProfilePictureUpdate(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.profilePicture = target.files[0];
      this.reader.onload = this.handleProfilePictureReader.bind(this);
      this.reader.readAsDataURL(this.profilePicture);
    }
  }

  private fetchUser(): void {
    const sub = this.authService.reFetchCurrentUser().subscribe(() => {
      sub.unsubscribe();
    });
  }

  private handleProfilePictureReader(e: ProgressEvent<FileReader>): void {
    if (e.target && e.target.result) {
      this.profilePictureRef.nativeElement.src = e.target.result.toString();
      this.profilePictureChanged = true;
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, ...NameValidator]],
      dateOfBirth: ["", [Validators.required]],
      age: ["", [Validators.required, ...AgeValidator]],
      phoneNumber: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required]],
      cityOrZipcode: ["", [Validators.required]],
      profilePicture: ["", [Validators.required]],
    });
  }

  private handleSubscription(user: Nullish<User>): void {
    this.user = user;
    if (user) {
      if (this.profilePictureRef) {
        this.profilePictureRef.nativeElement.src = user.profilePicture;
        this.profilePictureChanged = false;
      }
      this.form.patchValue({
        name: user.name,
        email: user.email,
        address: user.address,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        cityOrZipcode: user.cityOrZipcode,
        age: user.age,
        profilePicture: user.profilePicture,
      });
    }
  }
}
