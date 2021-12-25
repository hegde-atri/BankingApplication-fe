import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAccount } from 'src/app/shared/classes/account';
import { ICustomer } from '../../shared/classes/customer';

@Component({
  selector: 'ba-customer-my-view',
  templateUrl: './customer-my-view.component.html',
  styleUrls: ['./customer-my-view.component.scss']
})
export class CustomerMyViewComponent implements OnInit {
  budgetForm: FormGroup;
  pageTitle: string = "My View";
  baseUrl: string = "http://localhost:6600/customer"


  customerAccounts: IAccount[] = []


  sliderValue:number  = 0;
  sliderMaxValue:number  = 1500;

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient) {
    this.budgetForm = this.fb.group({
      min: ['', []],
      max: ['', []]
    });
  }

  ngOnInit(): void {
    this.getAccount()

  }

  getAccount() {
    //TODO: get customerID from msal claims
    const customerID = 1;

    this.httpClient.get<IAccount>(this.baseUrl + "/account").subscribe(
      result => {
        console.log(JSON.stringify(result))
      }
    )


  }


}
