import { Component, OnInit } from '@angular/core';
import {Chart} from "chart.js";
import {HttpClient} from "@angular/common/http";
import {ITransaction} from "../../../shared/interfaces/transaction";
import {MsalService} from "@azure/msal-angular";
import {ICustomer} from "../../../shared/interfaces/customer";
import {take} from "rxjs/operators";
import {IAccount} from "../../../shared/interfaces/account";

@Component({
  selector: 'ba-customer-spendings-charts',
  templateUrl: './spendings-charts.component.html',
  styleUrls: ['./spendings-charts.component.scss']
})
export class SpendingsChartsComponent implements OnInit {

  data: number[] = []
  baseUrl: string = 'https://bankappapiv1.azurewebsites.net/api/customer/';
  accounts: IAccount[] = [];
  labels: string[] = [];


  constructor(private http: HttpClient, private msal:MsalService) {

  }

  async ngOnInit() {

    await this.getData();

    // This is us creating and setting chart data/config.
    const a = new Chart("spendings-graph", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Spendings in £',
          data: this.data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  async getData(){
    let c = await this.http.get<ICustomer>(this.baseUrl + "customer/" + this.msal.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.accounts = await this.http.post<IAccount[]>(this.baseUrl + "account", {CustomerId: c.customerId})
      .pipe().toPromise();
    let mainAcc: IAccount;
    this.accounts.forEach(e=>{
      if(e.type == "Main" || e.type == "main"){
        mainAcc = e;
      }
    });

    let rawT: ITransaction[] = await this.http.get<ITransaction[]>(this.baseUrl + "transaction/" + mainAcc!.accountNumber +"/0")
      .pipe().toPromise();
    rawT = this.getCreditTransactions(rawT);

    let recent: ITransaction[] = [];
    let min = new Date(Date.now());
    // we want to get transaction in the past 7 days
    min.setDate(min.getDate() - 6);
    rawT.forEach(e=>{
      if(new Date(e.transDateTime) > min){
        recent.push(e);
      }
    });
    recent.forEach(x=>{
      this.data.push(x.amount)
    });

    this.adjustLabels(this.data.length);



  }

  adjustLabels(n: number) {
    for (let i = 0; i < n; i++) {
      this.labels.push("");
    }
  }

  getCreditTransactions(t: ITransaction[]): ITransaction[]{
    let c: ITransaction[] = [];
    t.forEach(e=>{
      if(e.type == "credit" || e.type == "Credit"){
        e.amount = -1 * e.amount;
        c.push(e);
      }
    });
    return c!;
  }

  dataSum(): number{
    let s = 0;
    this.data.forEach(e=>{
      s += e;
    });
    return s;
  }

  labelSum(): number{
    let s = 0;
    this.labels.forEach(e=>{
      s++;
    });
    return s;
  }



}
