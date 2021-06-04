import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TransactionHistoryTableItem {
  transactionID: string;
  accountID: string;
  type: string;
  amount: number;
  transDate: Date;
  description: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TransactionHistoryTableItem[] = [
  { transactionID: "651656", accountID: "2465", type: "DEBIT", amount: 20.00, transDate: new Date("2021-08-27"), description: "yes"},
  { transactionID: "654516", accountID: "6841", type: "CREDIT", amount: 30.00, transDate: new Date("2021-07-27"), description: "no"},
  { transactionID: "545612", accountID: "9814", type: "DEBIT", amount: 3000.00, transDate: new Date("2020-12-17"), description: "xd"},
  { transactionID: "581124", accountID: "4124", type: "CREDIT", amount: 400.00, transDate: new Date("2020-11-07"), description: ""},
  { transactionID: "867165", accountID: "6529", type: "CREDIT", amount: 20.00, transDate: new Date("2021-04-27"), description: ""}
];

/**
 * Data source for the TransactionHistoryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TransactionHistoryTableDataSource extends DataSource<TransactionHistoryTableItem> {
  data: TransactionHistoryTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TransactionHistoryTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TransactionHistoryTableItem[]): TransactionHistoryTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TransactionHistoryTableItem[]): TransactionHistoryTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'transactionID': return compare(a.transactionID, b.transactionID, isAsc);
        case 'accountID': return compare(a.accountID, b.accountID, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'amount': return compare(a.amount, b.amount, isAsc);
        case 'transDate': return compare(+a.transDate, +b.transDate, isAsc);
        case 'description': return compare(+a.description, +b.description, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
