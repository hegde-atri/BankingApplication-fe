import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MsalService} from "@azure/msal-angular";
import {HttpClient} from "@angular/common/http";
import {ICustomer} from "../../shared/interfaces/customer";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {take} from "rxjs/operators";
import {ITransaction} from "../../shared/interfaces/transaction";
import {IAccount} from "../../shared/interfaces/account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ba-customer-transaction-history',
  templateUrl: './customer-transaction-history.component.html',
  styleUrls: ['./customer-transaction-history.component.scss'],
})
export class CustomerTransactionHistoryComponent implements AfterViewInit {
  pageTitle: string = 'Transaction History';
  displayedColumns = ['type', 'amount', 'description', 'transDateTime'];
  accountSelectionGroup: FormGroup;
  rawData: ITransaction[] = [];
  data: TransactionTableItem[] = []
  dataSource: MatTableDataSource<TransactionTableItem>
  customer: ICustomer | undefined;
  baseUrl: string = 'http://localhost:6600/api/customer';
  customerAccounts: IAccount[] = [];
  filterText = "";
  chosenAccount = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private authService: MsalService, private httpClient: HttpClient,
              private fb: FormBuilder) {

    this.accountSelectionGroup = this.fb.group({
      accountNo: ['', [Validators.required]]
    });
    this.getData()
    this.dataSource = new MatTableDataSource(this.data);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  async getAccounts() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.customerAccounts = await this.httpClient.post<IAccount[]>(this.baseUrl + "/account",
      {CustomerId: this.customer.customerId}).pipe().toPromise();
  }


  async getData() {
    let accNo = (this.accountSelectionGroup.controls['accountNo'].value).accountNumber;
    this.rawData = await this.httpClient.get<ITransaction[]>(this.baseUrl + "/transaction/" + accNo + "/0")
      .pipe().toPromise();

    this.data = [];
    // converts ITransactions to TransactionTableItem
    this.rawData.forEach(e => {
      let a = {
        type: e.type,
        amount: e.amount,
        description: e.description,
        transDateTime: e.transDateTime
      };
      this.data.push(a as TransactionTableItem)
    });



    this.dataSource = new MatTableDataSource(this.data);
    // After we get the data we are going to sort it according to the highest value of money
    // we can accomplish this using merge sort

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.data = this.linearFilter(this.rawData, filterValue); // we pass in raw/unfiltered data to be filtered
  }

  linearFilter(a: TransactionTableItem[], s: string): TransactionTableItem[]{
    let r: TransactionTableItem[] = []

    a.forEach(element =>{
      let add = false;
      if(element.type.includes(s)){
        add = true;
      }
      if(element.description.includes(s)){
        add = true;
      }
      if(element.amount.toString().includes(s)){
        add = true;
      }

      if(add){
        r.push(element)
      }
    });
    return r;
  }


  sortAmountTable(){
    let d = this.dataSource.data
    let c = this.mergeSort(d);

    this.dataSource = new MatTableDataSource(c);
  }


  // TODO , use this merge sort somehow

  // Here is a recursive mergesort that we can use.
  mergeSort(items: TransactionTableItem[]): TransactionTableItem[] {
    console.log("here")
    return this.divide(items);

  }

  divide(items: TransactionTableItem[]): TransactionTableItem[] {
    // getting the midpoint of the array
    // math.ceil rounds the number to an integer, so we can use it
    let midpoint = Math.ceil(items.length / 2);
    // Splitting the array in the middle
    let min = items.slice(0, midpoint);
    let max = items.slice(midpoint);
    // We are saying that, if there is more than 1 number on each side, we split it
    if (midpoint > 1) {
      min = this.divide(min);
      max = this.divide(max);
    }
    return this.combine(min, max);
  }

  combine(min: TransactionTableItem[], max: TransactionTableItem[]): TransactionTableItem[] {
    let indexLow = 0;
    let indexHigh = 0;
    let lengthLow = min.length;
    let lengthHigh = max.length;
    let combined: TransactionTableItem[] = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
      let lowItem = min[indexLow];
      let highItem = max[indexHigh];
      if (lowItem.amount !== undefined) {
        if (highItem.amount === undefined) {
          combined.push(lowItem);
          indexLow++;
        } else {
          if (lowItem.amount <= highItem.amount) {
            combined.push(lowItem);
            indexLow++;
          } else {
            combined.push(highItem);
            indexHigh++;
          }
        }
      } else {
        if (highItem.amount !== undefined) {
          combined.push(highItem);
          indexHigh++;
        }
      }
    }
    return combined;
  }

}

export interface TransactionTableItem{
  type: string;
  amount: number;
  description: string;
  transDateTime: Date;
}
