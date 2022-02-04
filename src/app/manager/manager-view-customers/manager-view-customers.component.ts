import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICustomer} from "../../shared/interfaces/customer";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'ba-manager-view-customers',
  templateUrl: './manager-view-customers.component.html',
  styleUrls: ['./manager-view-customers.component.scss']
})
export class ManagerViewCustomersComponent implements OnInit, AfterViewInit {
  pageTitle = "View customers";
  displayedColumns = ['firstname', 'lastname', 'email', 'status', 'doB', 'createdDate'];
  tableSource = new MatTableDataSource<ICustomer>();
  cusUrl = "http://localhost:6600/api/manager/customer/";
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
    this.http.get<ICustomer[]>(this.cusUrl, {headers: this.headers}).subscribe(
      res => {
        this.tableSource.data = res as ICustomer[];
      });
  }

  // Create custom linear filter here

  doFilter = (value: string) => {
    this.tableSource.filter = value.trim().toLocaleLowerCase();
  }

}
