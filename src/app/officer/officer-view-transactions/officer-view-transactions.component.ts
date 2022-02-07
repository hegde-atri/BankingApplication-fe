import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ITransaction} from "../../shared/interfaces/transaction";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'ba-officer-view-transactions',
  templateUrl: './officer-view-transactions.component.html',
  styleUrls: ['./officer-view-transactions.component.scss']
})
export class OfficerViewTransactionsComponent implements OnInit, AfterViewInit{
  pageTitle = "View Transactions";
  displayedColumns = ['accountNumber', 'type', 'amount', 'transDateTime', 'createdBy'];
  tableSource = new MatTableDataSource<ITransaction>();
  transUrl = "https://bankappapiv1.azurewebsites.net/api/officer/transaction";
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  filterText = "";

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.tableSource.sort = this.sort!;
    this.tableSource.paginator = this.paginator!;
  }

  getData(){
    this.http.get<ITransaction[]>(this.transUrl, {headers: this.headers})
      .subscribe(res =>{
        this.tableSource.data = res as ITransaction[];
      });
  }

  filter(value: string){
    this.tableSource.filter = value.trim().toLocaleLowerCase();
  }

}
