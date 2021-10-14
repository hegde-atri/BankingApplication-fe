import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITransaction } from 'src/app/shared/classes/transaction';

@Component({
  selector: 'ba-teller-deposit',
  templateUrl: './teller-deposit.component.html',
  styleUrls: ['./teller-deposit.component.scss'],
})
export class TellerDepositComponent implements OnInit {
  pageTitle = 'Deposit';
  transferForm: FormGroup;
  transaction: ITransaction | undefined;

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
      description: ['Teller transfer - Deposit', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  transfer() {}
}
