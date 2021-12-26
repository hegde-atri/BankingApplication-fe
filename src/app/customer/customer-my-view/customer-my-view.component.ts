import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/shared/classes/account';
import { customerRequest } from 'src/app/shared/classes/customer-request';
import { ICustomer } from '../../shared/classes/customer';

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss'],
})
export class CustomerMyViewComponent implements OnInit {
  budgetForm: FormGroup;
  pageTitle: string = 'My View';
  baseUrl: string = 'http://localhost:6600/api/customer';
  request_object: customerRequest;
  customerId = 1;

  temp: IAccount[] = [];
  customerAccounts: IAccount[] = [];

  sliderValue: number = 0;
  sliderMaxValue: number = 1500;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: MsalService
  ) {
    this.request_object = new customerRequest(0, [1], [0], [0], [0], [0]);
    this.budgetForm = this.fb.group({
      min: ['', []],
      max: ['', []],
    });
  }

  ngOnInit(): void {
    this.getCustomerId();
    this.getAccounts2();
    //let arr: IAccount[] = this.getAccounts().subscribe();

    //     arr1.forEach(element => {
    //       console.log(element);
    //       let a = element as IAccount;
    //       console.log(a);
    //       arr.push(a);
    console.log(this.customerAccounts);
    console.log(1);
    console.log(this.customerAccounts);
    console.log(2);
    console.log(this.customerAccounts);
  }

  getCustomer() {}

  getCustomerId() {}

  getAccounts(): Observable<IAccount[]> {
    let x: Observable<IAccount[]>;
    var data = {
      CustomerId: this.customerId,
    };
    x = this.httpClient.post<IAccount[]>(this.baseUrl + '/account', data);
    console.log(x);
    return x;
  }

  getAccounts1(): void {
    let x: IAccount[] = [];
    var data = {
      CustomerId: this.customerId,
    };
    this.httpClient
      .post<[]>(this.baseUrl + '/account', data)
      .subscribe((result) => {
        console.log(JSON.stringify(result));
        let arr: IAccount[] = []; //[];
        let arr1: [] = result;
        arr1.forEach((element) => {
          console.log(element);
          let a = element as IAccount;
          console.log(a);
          arr.push(a);
          this.customerAccounts.push(a);
        });
        //this.customerAccounts.push(arr);
        x = arr;
        console.log(this.customerAccounts);
        return arr;
      }); //     // arr.push(result);

    // })
  }

  getAccounts2(): void {
    var data = {
      CustomerId: this.customerId,
    };
    this.httpClient
      .post<[]>(this.baseUrl + '/account', data)
      .subscribe((result) => {
        console.log(JSON.stringify(result));
        let arr1: [] = result;
        arr1.forEach((element) => {
          console.log(element);
          let a = element as IAccount;
          console.log(a.balance);
          this.customerAccounts.push(a);
        });
      }); //     // arr.push(result);
    // })
  }
}
