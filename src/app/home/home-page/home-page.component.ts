import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ba-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  pageTitle: string = "Super Stonks Banking";

  constructor() { }

  ngOnInit(): void {
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
