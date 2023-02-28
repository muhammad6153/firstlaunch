import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { switchMap } from "rxjs/operators";
import { BehaviorSubject, Subscription } from "rxjs";
import { UsersService } from "@modules/admin/services/users.service";
import type { User } from "@/app/models/user";
import { AdminUtilsService } from "@modules/admin/services/admin-utils.service";

@Component({
  selector: "app-admin-users-page",
  templateUrl: "./admin-users-page.component.html",
  styleUrls: ["./admin-users-page.component.scss"],
})
export class AdminUsersPageComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private readonly usersService: UsersService;
  private readonly utilsService: AdminUtilsService;
  public readonly dataSource: MatTableDataSource<User>;
  public readonly displayedColumns: string[];
  private subscription: Subscription;
  public fetchingUsers: boolean;

  @ViewChild(MatPaginator)
  private readonly paginator!: MatPaginator;

  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  private dataLoader: BehaviorSubject<null>;

  constructor(usersService: UsersService, utilsService: AdminUtilsService) {
    this.usersService = usersService;
    this.utilsService = utilsService;
    this.dataSource = new MatTableDataSource<User>([]);
    this.subscription = Subscription.EMPTY;
    this.fetchingUsers = true;
    this.displayedColumns = ["id", "name", "email", "role", "creationDate"];
    this.dataLoader = new BehaviorSubject(null);
  }

  public ngOnInit(): void {
    this.subscription = this.dataLoader
      .pipe(
        switchMap(() => this.usersService.fetchUsers()),
        switchMap(() => this.usersService.users())
      )
      .subscribe(this.handleSubscription.bind(this));
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public fetchData(): void {
    this.fetchingUsers = true;
    this.dataLoader.next(null);
  }

  private handleSubscription(users: User[]): void {
    this.dataSource.data = users;
    this.fetchingUsers = false;
  }

  public downloadData(): void {
    this.utilsService.downloadFile(
      this.dataSource.data,
      [
        "id",
        "uid",
        "name",
        "email",
        "role",
        "address",
        "nationality",
        "dateOfBirth",
        "phoneNumber",
        "cityOrZipcode",
        "age",
        "creationDate",
      ],
      "first-launch-users"
    );
  }
}
