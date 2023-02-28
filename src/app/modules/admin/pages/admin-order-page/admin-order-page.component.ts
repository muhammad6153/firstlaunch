import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "@modules/admin/services/orders.service";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, of, Subscription } from "rxjs";
import { UserOrder } from "@modules/user/models/user-order";
import { catchError, map, switchMap } from "rxjs/operators";
import { OrderAssociationsDialogComponent } from "@modules/admin/dialogs/order-associations-dialog/order-associations-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "@modules/admin/services/users.service";
import { User, UserRole } from "@/app/models/user";
import { Nullish } from "@/app/models/nullish";
import { AuthService } from "@/app/services/auth.service";

type AssociatedUser = { id: number; name: string; role: string };

@Component({
  selector: "app-admin-order-page",
  templateUrl: "./admin-order-page.component.html",
  styleUrls: ["./admin-order-page.component.scss"],
})
export class AdminOrderPageComponent implements OnInit, OnDestroy {
  private readonly ordersService: OrdersService;
  private readonly route: ActivatedRoute;
  private readonly $orderSubject: BehaviorSubject<null>;
  private readonly dialog: MatDialog;
  private readonly usersService: UsersService;
  private readonly authService: AuthService;
  private orderSubscription: Subscription;
  private newItemDialogSubscription: Subscription;
  private usersSubscription: Subscription;
  private userSubscription: Subscription;
  public loading: boolean;
  public order: UserOrder | null;
  public user: Nullish<User>;
  public users: AssociatedUser[];
  public loadingAssociations: boolean;

  constructor(
    route: ActivatedRoute,
    ordersService: OrdersService,
    dialog: MatDialog,
    usersService: UsersService,
    authService: AuthService
  ) {
    this.route = route;
    this.ordersService = ordersService;
    this.dialog = dialog;
    this.usersService = usersService;
    this.authService = authService;
    this.$orderSubject = new BehaviorSubject(null);
    this.orderSubscription = Subscription.EMPTY;
    this.newItemDialogSubscription = Subscription.EMPTY;
    this.usersSubscription = Subscription.EMPTY;
    this.userSubscription = Subscription.EMPTY;
    this.loading = true;
    this.loadingAssociations = true;
    this.user = null;
    this.order = null;
    this.users = [];
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
        this.loadingAssociations = false;
      })
      .catch((e) => console.log(e));
    this.orderSubscription = this.$orderSubject
      .pipe(switchMap(() => this.route.params))
      .pipe(switchMap(({ id }) => this.ordersService.fetchOrder(id)))
      .pipe(catchError(() => of(null)))
      .subscribe(this.handleSubscription.bind(this));
    this.usersSubscription = this.usersService
      .users()
      .pipe(
        map((users) =>
          users.filter((user) =>
            AdminOrderPageComponent.hasAuthorizedRole(user)
          )
        )
      )
      .subscribe((users) => {
        this.users = users.map(({ id, name, role }) => ({ id, name, role }));
      });
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  public ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  public fetchData(): void {
    this.loading = true;
    this.$orderSubject.next(null);
  }

  public get orderAssociations(): AssociatedUser[] {
    return this.users.filter((user) =>
      (this.order?.associations || []).includes(user.id)
    );
  }

  public get isAdmin(): boolean {
    return this.user?.role === UserRole.Admin;
  }

  private handleSubscription(order: UserOrder | null): void {
    this.order = order;
    this.loading = false;
  }

  public async removeAssociation(user: AssociatedUser): Promise<void> {
    try {
      this.loadingAssociations = true;
      await this.ordersService
        .removeUsersToOrder([{ userId: user.id, orderId: this.order?.id }])
        .toPromise();
      const index = this.users.indexOf(user);
      if (index >= 0) {
        this.users.splice(index, 1);
      }
      this.loadingAssociations = false;
    } catch (e) {
      console.log(e);
    }
  }

  public openOrderAssociationsDialog(): void {
    this.newItemDialogSubscription.unsubscribe();
    const dialogRef = this.dialog.open(OrderAssociationsDialogComponent, {
      data: { orderId: this.order?.id, associations: this.order?.associations },
    });
    this.newItemDialogSubscription = dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }
}
