import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PayeeTableDataSource, PayeeTableItem } from './payee-table-datasource';

@Component({
  selector: 'ba-payee-table',
  templateUrl: './payee-table.component.html',
  styleUrls: ['./payee-table.component.scss']
})
export class PayeeTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PayeeTableItem>;
  dataSource: PayeeTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['payeeId', 'accountId', 'customerId', 'payeeName', 'nickname', 'sortCode', 'description'];

  constructor() {
    this.dataSource = new PayeeTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
