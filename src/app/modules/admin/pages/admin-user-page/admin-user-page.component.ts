import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "@/app/services/auth.service";
import { UsersService } from "@modules/admin/services/users.service";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User, UserRole } from "@/app/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-admin-user-page",
  templateUrl: "./admin-user-page.component.html",
  styleUrls: ["./admin-user-page.component.scss"],
})
export class AdminUserPageComponent implements OnInit, OnDestroy {
  private readonly authService: AuthService;
  private readonly usersService: UsersService;
  private readonly route: ActivatedRoute;
  private readonly matSnackBar: MatSnackBar;
  private readonly router: Router;
  private currentUserSubscription: Subscription;
  private updateUserSubscription: Subscription;
  public readonly form: FormGroup;
  public readonly minDataOfBirth: Date;
  public readonly maxDataOfBirth: Date;
  public user: User | null;
  public profilePictureSource: string;
  public loading: boolean;
  private dataLoader: BehaviorSubject<null>;
  private requestLoader: BehaviorSubject<null>;

  constructor(
    route: ActivatedRoute,
    authService: AuthService,
    formBuilder: FormBuilder,
    usersService: UsersService,
    matSnackBar: MatSnackBar,
    router: Router
  ) {
    this.usersService = usersService;
    this.matSnackBar = matSnackBar;
    this.router = router;
    this.form = formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      dateOfBirth: [""],
      age: [0],
      phoneNumber: [""],
      nationality: [""],
      email: ["", [Validators.required, Validators.email]],
      address: [""],
      cityOrZipcode: [""],
      profilePicture: [""],
      role: [UserRole.User, [Validators.required]],
    });
    this.route = route;
    this.authService = authService;
    this.currentUserSubscription = Subscription.EMPTY;
    this.updateUserSubscription = Subscription.EMPTY;
    this.user = null;
    this.loading = true;
    const currentYear = new Date().getFullYear();
    this.minDataOfBirth = new Date(currentYear - 60, 0, 0);
    this.maxDataOfBirth = new Date(currentYear - 18, 0, 0);
    this.profilePictureSource = "";
    this.dataLoader = new BehaviorSubject(null);
    this.requestLoader = new BehaviorSubject(null);
  }

  public ngOnInit(): void {
    this.currentUserSubscription = this.dataLoader
      .pipe(
        switchMap(() => this.route.params),
        switchMap(({ id }) => this.usersService.fetchUser(id)),
        catchError(() => {
          this.matSnackBar.open(
            "Unable to load user's profile, please try again!",
            "OK",
            {
              duration: 5000,
              horizontalPosition: "start",
              panelClass: "bg-danger",
            }
          );
          return of(null);
        })
      )
      .subscribe(this.handleSubscription.bind(this));
    this.updateUserSubscription = this.requestLoader
      .pipe(
        switchMap(() => this.route.params),
        switchMap(({ id }) => {
          if (!this.user) {
            return of(null);
          }
          return this.usersService.updateUser({
            ...this.form.value,
            age: +this.form.value.age,
            id,
          });
        }),
        catchError(() => {
          this.matSnackBar.open(
            "Unable to load user's profile, please try again!",
            "OK",
            {
              duration: 5000,
              horizontalPosition: "start",
              panelClass: "bg-danger",
            }
          );
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res !== null) {
          this.matSnackBar.open("Profile updated successfully!", "OK", {
            duration: 5000,
            horizontalPosition: "start",
            panelClass: "bg-success",
          });
        }
        this.form.enable();
        this.loading = false;
      });
  }

  public ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.updateUserSubscription.unsubscribe();
  }

  public handleSubmit(): void {
    this.form.disable();
    this.requestLoader.next(null);
  }

  public async handleProfilePictureUpdate(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // this.form.patchValue({ profilePicture: e.target?.result });
        if (e.target && e.target.result) {
          this.profilePictureSource = e.target.result.toString();
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  public fetchData(): void {
    this.loading = true;
    this.dataLoader.next(null);
  }

  private handleSubscription(user: User | null): void {
    this.user = user;
    if (user) {
      this.form.patchValue({
        name: user.name,
        email: user.email,
        address: user.address,
        nationality: user.nationality,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        cityOrZipcode: user.cityOrZipcode,
        age: +user.age,
        profilePicture: user.profilePicture,
        role: user.role,
      });
      this.profilePictureSource = user.profilePicture;
    }
    this.loading = false;
  }

  public async deleteUser(): Promise<void> {
    if (this.user) {
      this.loading = true;
      await this.usersService.deleteUser(this.user.uid).toPromise();
      await this.router.navigate(["/admin/users"]);
    }
  }
}
