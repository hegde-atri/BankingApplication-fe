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
  raw: ICustomer[] = [];
  cusUrl = "https://bankappapiv1.azurewebsites.net/api/manager/customer/";
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  filterText = "";

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    await this.getData();
  }

  ngAfterViewInit() {
    this.tableSource.sort = this.sort!;
    this.tableSource.paginator = this.paginator!;
  }

  async getData(){
    this.http.get<ICustomer[]>(this.cusUrl, {headers: this.headers}).subscribe(
      res => {
        this.raw = res as ICustomer[];
      });
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(500);
    this.tableSource.data = this.raw;
  }

  // TODO: linear filter

  doFilter(value: string) {
    let temp: ICustomer[] = [];
    this.raw.forEach(e=>{
      let contains = false;
      if(e.email.includes(value)){
        contains = true;
      }else if(e.createdBy.includes(value)){
        contains = true;
      }

      if(contains){
        temp.push(e);
      }
    });

    this.tableSource.data = temp;
  }

}
