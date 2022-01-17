import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITransaction } from 'src/app/shared/interfaces/transaction';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MsalService} from "@azure/msal-angular";
import {take, tap} from "rxjs/operators";
import {IAccount} from "../../shared/interfaces/account";

@Component({
  selector: 'ba-teller-withdraw',
  templateUrl: './teller-withdraw.component.html',
  styleUrls: ['./teller-withdraw.component.scss'],
})
export class TellerWithdrawComponent implements OnInit {
  pageTitle = 'Withdraw';
  transferForm: FormGroup;
  baseUrl: string = 'http://localhost:6600/api/teller/';


  constructor(private fb: FormBuilder, private httpClient: HttpClient,
              private snackbar: MatSnackBar, private authService: MsalService) {
    this.transferForm = this.fb.group({
      accountNumber: ['',[Validators.required,Validators.minLength(16),
        Validators.maxLength(16),]],
      amount: ['',[Validators.required, Validators.min(5), Validators.max(2500)]],
      description: ['Teller transfer - Withdraw', [Validators.required]],
    });
  }

  ngOnInit(): void {}

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
      let a = await this.httpClient.get<boolean>(this.baseUrl + "account/" + accNo, {headers: headers})
        .pipe(take(1)).toPromise();
      let tellerName = this.authService.instance.getActiveAccount()?.username
      //account actually exists, then we can try to get the account object
      if(a){
        let acc = await this.httpClient.post<IAccount>(this.baseUrl + "account/" + accNo, {headers: headers})
          .pipe(take(1)).toPromise();
        // Creating the transaction object
        let t = this.transferForm.value
        let amount = this.transferForm.controls['amount'].value;
        //credit transaction, im using signed double for my amount to make it simple.
        // i.e. money leaving the account will be -ve
        t.amount = (amount * -1);
        t.accountId = acc.accountId;
        t.accountNumber = accNo;
        t.description = "Teller transfer - withdrawal";
        t.type = "credit";
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
    this.snackbar.open("Transaction successful!", "Okay")
    this.transferForm.reset();
  }
}
