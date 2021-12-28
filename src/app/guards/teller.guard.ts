import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MsalService} from "@azure/msal-angular";

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
    // this just checks if the user is logged in at this point
    // TODO: change this to read claims
    // the double exclamation mark makes it into a boolean value, which will be false if the object is null
    if(!!this.authService.instance.getActiveAccount()){
      return true;
    }else{
      this.router.navigate(['/home']);
      return false;
    }
  }
}
