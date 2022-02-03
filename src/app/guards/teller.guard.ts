import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MsalService} from "@azure/msal-angular";
import {Token} from "../shared/interfaces/token";

@Injectable({
  providedIn: 'root'
})
export class TellerGuard implements CanActivate {

  constructor(private authService: MsalService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isTeller();
  }

  isTeller(): boolean{
    let t = this.authService.instance.getActiveAccount()?.idTokenClaims as Token;
    if(t.extension_Role == "Teller"){
      return true;
    }else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}
