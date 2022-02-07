import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITransaction } from 'src/app/shared/interfaces/transaction';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAccount} from "../../shared/interfaces/account";
import {take, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MsalService} from "@azure/msal-angular";

@Component({
  selector: 'ba-teller-deposit',
  templateUrl: './teller-deposit.component.html',
  styleUrls: ['./teller-deposit.component.scss'],
})
export class TellerDepositComponent implements OnInit {
  pageTitle = 'Deposit';
  transferForm: FormGroup;
  baseUrl: string = 'https://bankappapiv1.azurewebsites.net/api/teller/';


  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private snackbar: MatSnackBar, private authService: MsalService) {
    this.transferForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(16),Validators.maxLength(16),]],
      amount: ['', [Validators.required, Validators.min(5), Validators.max(2500)]],
      description: ['Teller transfer - Deposit', [Validators.required]],
    });
  }

  ngOnInit(): void {}


  // async getAccount(accNo: string): Observable<IAccount>{
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.httpClient.post<IAccount>(this.baseUrl + "account/" + accNo, {headers: headers});
  // }

  createTransaction(t: ITransaction){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post<ITransaction>(this.baseUrl+"transaction", t,{headers:headers})
      .pipe(
        tap(data => console.log("created transaction: " + JSON.stringify(data)))
      );

  }

  async transfer() {

    if(this.transferForm.valid){
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      let accNo = this.transferForm.controls['accountNumber'].value;
      let a = await this.httpClient.get<IAccount>(this.baseUrl + "account/" + accNo, {headers: headers})
        .pipe(take(1)).toPromise();
      let tellerName = this.authService.instance.getActiveAccount()?.username
      //account actually exists, then we can try to get the account object
      if(a != null){
        let acc = await this.httpClient.post<IAccount>(this.baseUrl + "account/" + accNo, {headers: headers})
          .pipe(take(1)).toPromise();
        // Creating the transaction object
        let t = this.transferForm.value
        t.accountId = acc.accountId;
        t.accountNumber = accNo;
        t.description = "Teller transfer - deposit";
        t.type = "debit";
        t.createdBy = tellerName;
        t.createdDate = new Date(Date.now());

        this.createTransaction(t as ITransaction).subscribe({
          next: () => this.whenComplete(),
          error: err => console.log(err)
        })

      }else{
        this.snackbar.open("Account Not Found!","Okay");
      }
    }else{
      this.snackbar.open("Invalid Form!","Okay");

    }
  }

  whenComplete(){
    this.snackbar.open("Transaction successful!", "Okay");
    this.transferForm.reset();
    this.transferForm.patchValue({
      description: 'Teller transfer - Withdraw'
    });
  }
}
