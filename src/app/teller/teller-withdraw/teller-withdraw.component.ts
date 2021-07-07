import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-teller-withdraw',
  templateUrl: './teller-withdraw.component.html',
  styleUrls: ['./teller-withdraw.component.scss']
})
export class TellerWithdrawComponent implements OnInit {
  pageTitle = 'Withdraw'
  constructor() { }

  ngOnInit(): void {
  }

}
