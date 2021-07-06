import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ba-teller-deposit',
  templateUrl: './teller-deposit.component.html',
  styleUrls: ['./teller-deposit.component.scss']
})
export class TellerDepositComponent implements OnInit {
  customerForm: FormGroup;

  constructor() {
    this.customerForm = new FormGroup({});
   }

  ngOnInit(): void {
    
  }

}
