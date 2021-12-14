import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'ba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BankingApplication';
}
