import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MsalService} from "@azure/msal-angular";
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "../../shared/interfaces/customer";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ITransaction} from "../../shared/interfaces/transaction";
import {IAccount} from "../../shared/interfaces/account";
import {take} from "rxjs/operators";

@Component({
  selector: 'ba-customer-transaction-history',
  templateUrl: './customer-transaction-history.component.html',
  styleUrls: ['./customer-transaction-history.component.scss'],
})
export class CustomerTransactionHistoryComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'Transaction History';
  displayedColumns = ['type', 'amount', 'transDateTime', 'createdBy'];
  dataSource0 = new MatTableDataSource<ITransaction>();
  dataSource1 = new MatTableDataSource<ITransaction>();
  // since account number is bound to html code, will be called before the api makes its call
  // to get the accounts.
  customerAccounts: IAccount[] = [{accountNumber: "loading"} as IAccount, {accountNumber: "loading"} as IAccount]
  customer: ICustomer | undefined;
  baseUrl: string = 'http://localhost:6600/api/customer/';
  filter0 = "";
  filter1 = "";

  @ViewChild(MatPaginator) paginator0: MatPaginator | undefined;
  @ViewChild(MatSort) sort0: MatSort | undefined;
  @ViewChild(MatPaginator) paginator1: MatPaginator | undefined;
  @ViewChild(MatSort) sort1: MatSort | undefined;


  constructor(private authService: MsalService, private httpClient: HttpClient) {
  }

  ngOnInit() {

    this.getAccounts();
    this.getData();

  }

  ngAfterViewInit() {
    this.dataSource0.paginator = this.paginator0!;
    this.dataSource0.sort = this.sort0!;
    this.dataSource1.paginator = this.paginator1!;
    this.dataSource1.sort = this.sort1!;
  }

  async getAccounts(){
    let c = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    // this http.post actually returns us the accounts.
    this.customerAccounts = await this.httpClient.post<IAccount[]>(this.baseUrl + "account",
      {CustomerId: c.customerId}).pipe().toPromise();
  }

  async getData(){
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(500);
    // Customer always has only 2 accounts
    let accNo0 = this.customerAccounts[0].accountNumber;
    let accNo1 = this.customerAccounts[1].accountNumber;

    this.httpClient.get<ITransaction[]>(this.baseUrl + "transaction/" + accNo0 + "/0")
      .subscribe(res =>{
        this.dataSource0.data = res as ITransaction[]
      });

    this.httpClient.get<ITransaction[]>(this.baseUrl + "transaction/" + accNo1 + "/0")
      .subscribe(res =>{
        this.dataSource1.data = res as ITransaction[]
      });
  }

  doFilter0 = (value: string) => {
    this.dataSource0.filter = value.trim().toLocaleLowerCase();
  }

  doFilter1 = (value: string) => {
    this.dataSource1.filter = value.trim().toLocaleLowerCase();
  }


  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   // this.dataSource.data = this.linearFilter(this.rawData.data, filterValue); // we pass in raw/unfiltered data to be filtered
  // }
  //
  // linearFilter(a: ITransaction[], s: string): ITransaction[]{
  //   let r: ITransaction[] = []
  //
  //   a.forEach(element =>{
  //     let add = false;
  //     if(element.type.includes(s)){
  //       add = true;
  //     }
  //     if(element.description.includes(s)){
  //       add = true;
  //     }
  //     if(element.amount.toString().includes(s)){
  //       add = true;
  //     }
  //
  //     if(add){
  //       r.push(element)
  //     }
  //   });
  //   return r;
  // }
  //
  //
  // sortAmountTable(){
  //   let d = this.dataSource.data
  //   let c = this.mergeSort(d);
  //
  //   this.dataSource = new MatTableDataSource(c);
  // }
  //
  //
  // // Here is a recursive mergesort that we can use.
  // mergeSort(items: ITransaction[]): ITransaction[] {
  //   console.log("here")
  //   return this.divide(items);
  //
  // }
  //
  // divide(items: ITransaction[]): ITransaction[] {
  //   // getting the midpoint of the array
  //   // math.ceil rounds the number to an integer, so we can use it
  //   let midpoint = Math.ceil(items.length / 2);
  //   // Splitting the array in the middle
  //   let min = items.slice(0, midpoint);
  //   let max = items.slice(midpoint);
  //   // We are saying that, if there is more than 1 number on each side, we split it
  //   if (midpoint > 1) {
  //     min = this.divide(min);
  //     max = this.divide(max);
  //   }
  //   return this.combine(min, max);
  // }
  //
  // combine(min: ITransaction[], max: ITransaction[]): ITransaction[] {
  //   let indexLow = 0;
  //   let indexHigh = 0;
  //   let lengthLow = min.length;
  //   let lengthHigh = max.length;
  //   let combined: ITransaction[] = [];
  //   while (indexLow < lengthLow || indexHigh < lengthHigh) {
  //     let lowItem = min[indexLow];
  //     let highItem = max[indexHigh];
  //     if (lowItem.amount !== undefined) {
  //       if (highItem.amount === undefined) {
  //         combined.push(lowItem);
  //         indexLow++;
  //       } else {
  //         if (lowItem.amount <= highItem.amount) {
  //           combined.push(lowItem);
  //           indexLow++;
  //         } else {
  //           combined.push(highItem);
  //           indexHigh++;
  //         }
  //       }
  //     } else {
  //       if (highItem.amount !== undefined) {
  //         combined.push(highItem);
  //         indexHigh++;
  //       }
  //     }
  //   }
  //   return combined;
  // }

}
