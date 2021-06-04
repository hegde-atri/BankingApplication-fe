import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface PayeeTableItem {
  payeeId: string;
  accountId: string;
  customerId: string;
  payeeName: string;
  nickname: string;
  sortCode: string;
  description: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PayeeTableItem[] = [
  { payeeId: "11651", accountId: "8743659873", customerId: "23452345", payeeName: "julie_likes_to_game", nickname: "Julie", sortCode: "5438796", description: "" },
  { payeeId: "42727", accountId: "2350982375", customerId: "24352345", payeeName: "gomathy_is_a_hardworker", nickname: "Gomathy", sortCode: "879638", description: "" },
  { payeeId: "78574", accountId: "6576798679", customerId: "24568763", payeeName: "atri_is_weeb", nickname: "Atri", sortCode: "78387", description: "" },
  { payeeId: "74574", accountId: "4563456453", customerId: "45768345", payeeName: "glec_league", nickname: "Glec", sortCode: "8796387", description: "" },
  { payeeId: "84527", accountId: "4356345643", customerId: "56734325", payeeName: "kaan_astroneer", nickname: "Kaan", sortCode: "877479", description: "" },
  { payeeId: "21541", accountId: "3456435634", customerId: "76342645", payeeName: "alex_boom_boom", nickname: "Alex", sortCode: "456789", description: "" },
  { payeeId: "54458", accountId: "4356453634", customerId: "34267892", payeeName: "olly_very_cool", nickname: "Olly", sortCode: "5637896", description: "" }
];

/**
 * Data source for the PayeeTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PayeeTableDataSource extends DataSource<PayeeTableItem> {
  data: PayeeTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<PayeeTableItem[]> {
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
  private getPagedData(data: PayeeTableItem[]): PayeeTableItem[] {
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
  private getSortedData(data: PayeeTableItem[]): PayeeTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'payeeId': return compare(a.payeeId, b.payeeId, isAsc);
        case 'accountId': return compare(a.accountId, b.accountId, isAsc);
        case 'customerId': return compare(a.customerId, b.customerId, isAsc);
        case 'payeeName': return compare(a.payeeName, b.payeeName, isAsc);
        case 'nickname': return compare(a.nickname, b.nickname, isAsc);
        case 'sortCode': return compare(a.sortCode, b.sortCode, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
