import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-teller',
  templateUrl: './teller.component.html',
  styleUrls: ['./teller.component.scss'],
})
export class TellerComponent implements OnInit {
  withdraw = true;
  PageTitle_withdraw = 'Teller: Withdraw';
  PageTitle_deposit = 'Teller: Deposit';

  links = ['deposit', 'withdraw'];
  activeLink = this.links[0];

  constructor() {}

  ngOnInit(): void { }
}
