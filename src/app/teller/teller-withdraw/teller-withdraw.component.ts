import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/shared/classes/transaction';

@Component({
  selector: 'ba-teller-withdraw',
  templateUrl: './teller-withdraw.component.html',
  styleUrls: ['./teller-withdraw.component.scss']
})
export class TellerWithdrawComponent implements OnInit {
  pageTitle = 'Withdraw'
  transferForm: FormGroup;
  transaction = new Transaction();

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
      amount: ['', [Validators.required, Validators.min(5), Validators.max(2500)]],
      description: ['Teller transfer - Withdraw', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  transfer() {
    
  }

}
