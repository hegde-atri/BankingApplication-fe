import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITransaction } from 'src/app/shared/classes/transaction';

@Component({
  selector: 'ba-teller-withdraw',
  templateUrl: './teller-withdraw.component.html',
  styleUrls: ['./teller-withdraw.component.scss'],
})
export class TellerWithdrawComponent implements OnInit {
  pageTitle = 'Withdraw';
  transferForm: FormGroup;
  transaction: ITransaction = {
    'AccountNumber': '',
    'Type': 'Debit',
    'Amount': 0,
    'Description': '',
    'CreatedBy': '',
    'CreatedDate': new Date(),
    'TransDateTime': new Date(),
  }

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(19),
          Validators.maxLength(19),
        ],
      ],
      amount: [
        '',
        [Validators.required, Validators.min(5), Validators.max(2500)],
      ],
      description: ['Teller transfer - Withdraw', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  transfer() {
    this.transaction.AccountNumber = this.transferForm?.get('accountNumber')?.value;
    this.transaction.Amount = this.transferForm?.get('amount')?.value;
    this.transaction.Description = this.transferForm?.get('description')?.value;
    this.transaction.CreatedDate = new Date(Date.now());
    // this.transaction.AccountNumber = this.transferForm?.get('accountNumber')?.value;
    // this.transaction.AccountNumber = this.transferForm?.get('accountNumber')?.value;
    console.log("Transaction successful " + this.transaction.CreatedDate);
  }
}
