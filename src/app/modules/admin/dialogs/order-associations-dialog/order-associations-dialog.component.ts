import type {
  AfterViewInit,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Component, Inject, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import type { MatChipInputEvent } from "@angular/material/chips";
import type { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { map } from "rxjs/operators";
import { UsersService } from "@modules/admin/services/users.service";
import { OrdersService } from "@modules/admin/services/orders.service";
import { User, UserRole } from "@/app/models/user";

type OrderAssociationsDialogData = { orderId: number; associations: number[] };

type AssociatedUser = { id: number; name: string; role: string };

@Component({
  selector: "app-order-associations-dialog",
  templateUrl: "./order-associations-dialog.component.html",
  styleUrls: ["./order-associations-dialog.component.scss"],
})
export class OrderAssociationsDialogComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private readonly dialogRef: MatDialogRef<unknown>;
  private readonly usersService: UsersService;
  private readonly ordersService: OrdersService;
  public readonly data: OrderAssociationsDialogData;
  public usersSubscription: Subscription;
  public loading: boolean;
  public allUsers: AssociatedUser[];
  public users: AssociatedUser[];
  public filteredUsers: Observable<AssociatedUser[]>;
  public usersControl: FormControl;
  public separatorKeysCodes: number[] = [COMMA, ENTER];

  @ViewChild("usersInput")
  public usersInput!: ElementRef<HTMLInputElement>;

  @ViewChild("auto")
  public matAutocomplete!: MatAutocomplete;

  constructor(
    dialogRef: MatDialogRef<unknown>,
    @Inject(MAT_DIALOG_DATA) data: OrderAssociationsDialogData,
    usersService: UsersService,
    ordersService: OrdersService
  ) {
    this.dialogRef = dialogRef;
    this.usersService = usersService;
    this.ordersService = ordersService;
    this.data = data;
    this.users = [];
    this.allUsers = [];
    this.usersControl = new FormControl();
    this.usersSubscription = Subscription.EMPTY;
    this.loading = true;
    this.filteredUsers = this.usersControl.valueChanges.pipe(
      map(this.filter.bind(this))
    );
  }

  private static hasAuthorizedRole(user: User): boolean {
    return (
      user.role === UserRole.Collaborator ||
      user.role === UserRole.Coordinator ||
      user.role === UserRole.Partner
    );
  }

  public ngOnInit(): void {
    this.usersService
      .fetchUsers()
      .toPromise()
      .then(() => {
        this.loading = false;
        this.usersInput.nativeElement.disabled = false;
      })
      .catch((e) => console.log(e));
    this.usersSubscription = this.usersService
      .users()
      .pipe(
        map((users) =>
          users.filter((user) =>
            OrderAssociationsDialogComponent.hasAuthorizedRole(user)
          )
        )
      )
      .subscribe((users) => {
        this.allUsers = users.map(({ id, name, role }) => ({ id, name, role }));
        this.users = this.allUsers.filter((user) =>
          this.data.associations.includes(user.id)
        );
        this.usersControl.patchValue(this.allUsers);
      });
  }

  public ngAfterViewInit(): void {
    this.usersInput.nativeElement.disabled = true;
  }

  public ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
  }

  public add(event: MatChipInputEvent): void {
    if ((event.value || "").trim()) {
      const found = this.allUsers.find((user) => user.name === event.value);
      if (found) {
        this.users.push(found);
      }
    }
    if (event.input) {
      event.input.value = "";
    }
    this.usersControl.setValue(null);
  }

  public remove(user: AssociatedUser): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  public selected({ option }: MatAutocompleteSelectedEvent): void {
    const found = this.allUsers.find((user) => user.name === option.value.name);
    if (found) {
      this.users.push(found);
    }
    this.usersInput.nativeElement.value = "";
    this.usersInput.nativeElement.blur();
    this.usersControl.setValue(null);
  }

  public async handleSubmit(): Promise<void> {
    try {
      this.loading = true;
      this.usersInput.nativeElement.disabled = true;
      await this.ordersService
        .assignUsersToOrder(
          this.users.map(({ id }) => ({
            userId: id,
            orderId: this.data.orderId,
          }))
        )
        .toPromise();
      this.loading = false;
      this.usersInput.nativeElement.disabled = false;
      this.dialogRef.close();
    } catch (e) {
      console.log(e);
    }
  }

  private filter(value: AssociatedUser[] | string): AssociatedUser[] {
    if (Array.isArray(value)) {
      return value;
    }
    return this.allUsers.filter((user) =>
      user.name.toLowerCase().startsWith(value.toLowerCase() || "")
    );
  }
}
