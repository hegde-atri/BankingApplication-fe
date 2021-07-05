import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-teller',
  templateUrl: './teller.component.html',
  styleUrls: ['./teller.component.scss'],
})
export class TellerComponent implements OnInit {
  withdraw = true;

  constructor() {}

  ngOnInit(): void {}
}
