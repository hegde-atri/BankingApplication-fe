import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {map, take} from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {MsalService} from "@azure/msal-angular";
import {ICustomer} from "../../shared/interfaces/customer";
import {IPayee} from "../../shared/interfaces/payee";

export interface PayeeTableItem {
  name: string;
  accountNumber: string;
  description: string;
}

/**
 * Data source for the PayeeTable view. This class has
 * encapsulated all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PayeeTableDataSource extends DataSource<PayeeTableItem>{
  data: PayeeTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  customer: ICustomer | undefined;
  baseUrl: string = "http://localhost:6600/api/customer/";

  constructor(private httpClient:HttpClient, private authService: MsalService) {
    super();
    this.getData();
  }

  async getData(){
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    let p = await this.httpClient.get<IPayee[]>(this.baseUrl + "payee/" + this.customer.customerId + "/0")
      .pipe().toPromise();

    p.forEach(e => {
      let a = {
        accountNumber: e.accountNumber,
        name: e.name,
        description: e.description
      }
      this.data.push(a as PayeeTableItem)
    });
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
   * This will be a simple linear filter.
   */
  private getFilteredData(data: PayeeTableItem[], s: string): PayeeTableItem[]{
    let r: PayeeTableItem[] = []

    data.forEach(element =>{
      let add = false;
      if(element.name.includes(s)){
        add = true;
      }
      if(element.description.includes(s)){
        add = true;
      }
      if(element.accountNumber.toString().includes(s)){
        add = true;
      }

      if(add){
        r.push(element)
      }
    });
    return r;
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

  // Sort the data (client-side)
  private getSortedData(data: PayeeTableItem[]): PayeeTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'accountNumber': return compare(a.accountNumber, b.accountNumber, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        default: return 0;
      }
    });
  }
}

// Simple sort comparator for example ID/Name columns (for client-side sorting).
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
