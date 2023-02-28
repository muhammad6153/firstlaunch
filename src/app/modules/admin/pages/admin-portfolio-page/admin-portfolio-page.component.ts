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
import { BehaviorSubject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import type { PortfolioItem } from "@/app/models/portfolio-item";
import { PortfolioService } from "@modules/admin/services/portfolio.service";
import { AdminUtilsService } from "@modules/admin/services/admin-utils.service";
import { NewPortfolioItemDialogComponent } from "@modules/admin/dialogs/new-portfolio-item-dialog/new-portfolio-item-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-admin-portfolio-page",
  templateUrl: "./admin-portfolio-page.component.html",
  styleUrls: ["./admin-portfolio-page.component.scss"],
})
export class AdminPortfolioPageComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private readonly portfolioService: PortfolioService;
  private readonly utilsService: AdminUtilsService;
  private readonly dialog: MatDialog;
  public readonly dataSource: MatTableDataSource<PortfolioItem>;
  public readonly displayedColumns: string[];
  private subscription: Subscription;
  private newItemDialogSubscription: Subscription;
  public fetchingPortfolioItems: boolean;

  @ViewChild(MatPaginator)
  private readonly paginator!: MatPaginator;

  @ViewChild(MatSort)
  private readonly sort!: MatSort;

  private dataLoader: BehaviorSubject<null>;

  constructor(
    portfolioService: PortfolioService,
    utilsService: AdminUtilsService,
    dialog: MatDialog
  ) {
    this.portfolioService = portfolioService;
    this.utilsService = utilsService;
    this.dialog = dialog;
    this.dataSource = new MatTableDataSource<PortfolioItem>([]);
    this.subscription = Subscription.EMPTY;
    this.newItemDialogSubscription = Subscription.EMPTY;
    this.fetchingPortfolioItems = true;
    this.displayedColumns = ["id", "imageUrl", "title", "creationDate"];
    this.dataLoader = new BehaviorSubject(null);
  }

  public ngOnInit(): void {
    this.subscription = this.dataLoader
      .pipe(
        switchMap(() => this.portfolioService.fetchPortfolioItems()),
        switchMap(() => this.portfolioService.portfolioItems())
      )
      .subscribe(this.handleSubscription.bind(this));
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.newItemDialogSubscription.unsubscribe();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  public fetchData(): void {
    this.fetchingPortfolioItems = true;
    this.dataLoader.next(null);
  }

  private handleSubscription(users: PortfolioItem[]): void {
    this.dataSource.data = users;
    this.fetchingPortfolioItems = false;
  }

  public downloadData(): void {
    this.utilsService.downloadFile(
      this.dataSource.data,
      ["id", "title", "creationDate"],
      "first-launch-portfolio"
    );
  }

  public openNewItemDialog(): void {
    this.newItemDialogSubscription.unsubscribe();
    const dialogRef = this.dialog.open(NewPortfolioItemDialogComponent);
    this.newItemDialogSubscription = dialogRef.afterClosed().subscribe(() => {
      this.fetchData();
    });
  }
}
