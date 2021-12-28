import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ICustomer} from "../../shared/classes/customer";
import {IPayee} from "../../shared/classes/payee";
import {take} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-customer-fund-transfer',
  templateUrl: './customer-fund-transfer.component.html',
  styleUrls: ['./customer-fund-transfer.component.scss']
})
export class CustomerFundTransferComponent implements OnInit {
  // here we need 2 form groups to make it easier to use the front end stepper.
  payeeFormGroup: FormGroup;
  amountFormGroup: FormGroup;
  customer: ICustomer | undefined;
  baseUrl: string = 'http://localhost:6600/api/customer/';
  payee_array: IPayee[] | undefined;
    pageTitle: string = "Transfer Funds";

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private authService: MsalService) {
    this.payeeFormGroup = this.fb.group({
      payee: ['', Validators.required]
    });
    this.amountFormGroup = this.fb.group({
      amount: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.populatePayeeSelection();

  }
  async populatePayeeSelection(){
    this.customer = await this.httpClient.get<ICustomer>(this.baseUrl + "customer/" + this.authService.instance.getActiveAccount()?.username)
      .pipe(take(1)).toPromise();
    this.payee_array = await this.httpClient.get<IPayee[]>(this.baseUrl + "payee/" + this.customer.customerId + "/0")
      .pipe().toPromise();
  }

}
