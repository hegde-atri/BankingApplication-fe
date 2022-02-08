import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MsalService} from '@azure/msal-angular';
import {take} from 'rxjs/operators';
import {IAccount} from 'src/app/shared/interfaces/account';
import {ICustomer} from '../../shared/interfaces/customer';
import {Observable} from "rxjs";
import {ITransaction} from "../../shared/interfaces/transaction";
import {Chart} from "chart.js";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss'],
})

// TODO: include stacks somewhere

export class CustomerMyViewComponent implements OnInit {
  pageTitle: string = 'My View';
  baseUrl: string = 'https://bankappapiv1.azurewebsites.net/api/customer';
  customer: ICustomer | undefined;
  customers: ICustomer[] = []
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  customerAccounts: IAccount[] = [];
  sliderValue: number = 0;
  sliderMaxValue: number = 1500;
  transactions: ITransaction[] = [];
  debitT: ITransaction[] = [];
  creditT: ITransaction[] = [];
  budget_form_label = "";
  budget_form_value = 0;
  totalC = 0;
  totalD = 0;

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private authService: MsalService, private snackbar: MatSnackBar) {
  }

  async ngOnInit() {
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();

    this.customerAccounts = await this.httpClient.post<IAccount[]>(this.baseUrl + "/account",
      {CustomerId: this.customer.customerId}).pipe().toPromise();

    this.sliderMaxValue = Math.round(this.customerAccounts[0].balance / 100) * 100;
    this.sliderValue = this.customer.budget;

    await this.getTransactionData();

    this.budgetUpdated();
    // chart stuff
    const a = new Chart("spending-vs-earnings", {
      type: 'pie',
      data: {
        labels: ['Earnings','Spendings'],
        datasets: [{
          label: 'Earnings vs Spendings',
          data: [this.totalD, this.totalC],
          backgroundColor: [
            'rgb(125,229,210)',
            'rgb(135,210,105)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });


  }

  async getTransactionData() {

    let mainAcc: IAccount;
    this.customerAccounts.forEach(e => {
      if (e.type == "Main" || e.type == "main") {
        mainAcc = e;
      }
    });
    // raw transactions (all of them)
    let rawT: ITransaction[] = await this.httpClient.get<ITransaction[]>(this.baseUrl + "/transaction/" + mainAcc!.accountNumber + "/0")
      .pipe().toPromise();
    this.debitT = this.getDebitTransactions(rawT);
    this.creditT = this.getCreditTransactions(rawT);

    this.totalD = this.getTransactionSum(this.debitT);
    this.totalC = this.getTransactionSum(this.creditT);

  }

  getDebitTransactions(t: ITransaction[]): ITransaction[] {
    let d: ITransaction[] = [];
    t.forEach(e => {
      if (e.type == "debit" || e.type == "Debit") {
        d.push(e);
      }
    });
    return d!;
  }

  getCreditTransactions(t: ITransaction[]): ITransaction[] {
    let c: ITransaction[] = [];
    t.forEach(e => {
      if (e.type == "credit" || e.type == "Credit") {
        e.amount = -1 * e.amount;
        c.push(e);
      }
    });
    return c!;
  }

  getTransactionSum(t: ITransaction[]): number {
    let total = 0;
    t.forEach(e => {
      total += e.amount;
    });
    return total;
  }

  // We get rid of all the transactions older than a month
  filterTransactions(t: ITransaction[]): ITransaction[] {
    let recent: ITransaction[] = [];
    let min = new Date(Date.now());
    min.setDate(min.getDate() - 30);
    t.forEach(e => {
      if (new Date(e.transDateTime) > min) {
        recent.push(e);
      }
    });
    return recent;
  }

  putBudget(c: ICustomer): Observable<ICustomer> {
    c.budget = this.sliderValue;
    return this.httpClient.put<ICustomer>(this.baseUrl + "/customer/" + this.authService.instance.getActiveAccount()?.username, c, {headers: this.headers});
  }

  budgetUpdated(){
    let netT = this.sliderValue - this.totalC;
    if(netT > 0){
      this.budget_form_label = "Budget remaining:";
      this.budget_form_value = netT;
    }else{
      this.budget_form_label = "Budget exceeded by:";
      this.budget_form_value = (-1 * netT);
    }
  }

  saveBudget() {
    this.putBudget(this.customer!).subscribe({
      next: () => {
        this.budgetUpdated();
        this.snackbar.open("Budget saved!", "Okay");
      },
      error: err => this.snackbar.open("Could not save budget!", "Okay")
    });
  }
}
