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


 // Data source for the PayeeTable view. This class has
 // encapsulated all logic for fetching and manipulating the displayed data
 // (including sorting, pagination, and filtering).

export class PayeeTableDataSource extends DataSource<PayeeTableItem>{
  data: PayeeTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  customer: ICustomer | undefined;
  baseUrl: string = "https://bankappapiv1.azurewebsites.net/api/customer/";

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

  // Connects to target data source
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

  disconnect(): void {}


   // Paginate the data (client-side). If you're using server-side pagination,
   // this would be replaced by requesting the appropriate data from the server.

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
