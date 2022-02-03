import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { take } from 'rxjs/operators';
import { IAccount } from 'src/app/shared/interfaces/account';
import { ICustomer } from '../../shared/interfaces/customer';
import {Observable} from "rxjs";
import {ITransaction} from "../../shared/interfaces/transaction";
import {Chart, Point} from "chart.js";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss'],
})

// TODO: include stacks somewhere

export class CustomerMyViewComponent implements OnInit, AfterViewInit {
  pageTitle: string = 'My View';
  baseUrl: string = 'http://localhost:6600/api/customer';
  customer: ICustomer | undefined;
  customers: ICustomer[] = []
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  customerAccounts: IAccount[] = [];
  sliderValue: number = 0;
  sliderMaxValue: number = 1500;
  transactions: ITransaction[] =[];
  monthlySpendings = 0;

  @ViewChild('chart')
  private chartRef: ElementRef | undefined;
  private chart: Chart | undefined;
  private data: Point[];

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: MsalService, private snackbar: MatSnackBar
  ) {
    this.data = [{x: 1, y: 5}, {x: 2, y: 10}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 4.1, y: 6}];
  }

  async ngOnInit() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();

    this.customerAccounts = await this.httpClient.post<IAccount[]>(this.baseUrl + "/account",
      {CustomerId: this.customer.customerId}).pipe().toPromise();

    this.sliderMaxValue = Math.round(this.customerAccounts[0].balance/100)*100;
    this.sliderValue = this.customer.budget;

    this.transactions = await this.httpClient.get<ITransaction[]>(this.baseUrl + "/transaction/" + this.customerAccounts[0].accountNumber + "/0", {headers: this.headers})
      .pipe().toPromise();
    // this.transactions = this.filterTransactions(this.transactions);
    // console.log(this.transactions);



  }

  ngAfterViewInit(): void {

    this.chart = new Chart(this.chartRef!.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Spendings',
          data: this.data,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          // @ts-ignore
          xAxes: [{
            type: 'linear'
          }],
        }
      }
    });
  }


  // We get rid of all the transactions older than a month
  filterTransactions(t: ITransaction[]): ITransaction[]{
    const today = new Date(Date.now());
    // oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 2);
    let temp: ITransaction[] = [];
    t.forEach(e =>{
      if((today.valueOf() - e.transDateTime.valueOf()) > 1000/*ms*/ * 60/*s*/ * 60/*min*/ * 24/*h*/ * 30/*days*//*months*/){
        temp.push(e);
      }else{
        console.log(e)
      }
    });
    return temp;
  }

  putBudget(c: ICustomer): Observable<ICustomer>{
    c.budget = this.sliderValue;
    return this.httpClient.put<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username, c, {headers: this.headers});
  }

  saveBudget(){
    this.putBudget(this.customer!).subscribe({
      next: ()=> this.snackbar.open("Budget saved!", "Okay"),
      error: err => this.snackbar.open("Could not save budget!", "Okay")
      });
  }
}
