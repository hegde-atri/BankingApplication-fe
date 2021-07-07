import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function accountNumberValid(c: AbstractControl): { [key: string]: boolean } | null {
  //if (condition) return accValidTrue
  return null;
}
@Component({
  selector: 'ba-teller-deposit',
  templateUrl: './teller-deposit.component.html',
  styleUrls: ['./teller-deposit.component.scss'],
})
export class TellerDepositComponent implements OnInit {
  depositForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.depositForm = this.fb.group({
      accountNo: [' ', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      sortCode: '',
      amount: '',
    });
  }

  ngOnInit(): void {  }

  deposit() {
    console.log(this.depositForm);
    console.log('Saved: ' + JSON.stringify(this.depositForm.value));
  }
}
