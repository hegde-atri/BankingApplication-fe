import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IAccount} from "../../shared/interfaces/account";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'ba-officer-view-accounts',
  templateUrl: './officer-view-accounts.component.html',
  styleUrls: ['./officer-view-accounts.component.scss']
})
export class OfficerViewAccountsComponent implements OnInit, AfterViewInit {
  pageTitle = "View Accounts";
  displayedColumns = ['accountNumber', 'type', 'balance', 'status']
  tableSource = new MatTableDataSource<IAccount>();
  accUrl = "https://bankappapiv1.azurewebsites.net/api/officer/account/";
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  filterText = "";

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.tableSource.sort = this.sort!;
    this.tableSource.paginator = this.paginator!;
  }

  getData(){
    this.http.get<IAccount[]>(this.accUrl, {headers: this.headers}).subscribe(
      res => {
        this.tableSource.data = res as IAccount[];
      });
  }

  doFilter = (value: string) => {
    this.tableSource.filter = value.trim().toLocaleLowerCase();
  }
  // TODO: merge sort for amount header.
}
