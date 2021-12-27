import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {HttpClient} from "@angular/common/http";
import {MsalService} from "@azure/msal-angular";
import {PayeeTableDataSource} from "./payee-table-datasource";


export interface PayeeTableItem {
  name: string;
  accountNumber: string;
  description: string;
}

@Component({
  selector: 'ba-customer-view-payees',
  templateUrl: './customer-view-payees.component.html',
  styleUrls: ['./customer-view-payees.component.scss']
})
export class CustomerViewPayeesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PayeeTableItem>;
  dataSource: PayeeTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'accountNumber', 'description'];

  constructor(private httpClient:HttpClient, private authService: MsalService) {
    this.dataSource = new PayeeTableDataSource(this.httpClient, this.authService);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.table.dataSource = this.dataSource;
  }
}
