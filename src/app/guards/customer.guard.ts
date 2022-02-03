import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MsalService} from "@azure/msal-angular";
import {Token} from "../shared/interfaces/token";

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(private authService: MsalService, private router: Router) {
  }

  canActivate (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isCustomer();
  }

  isCustomer(): boolean{
    let c = this.authService.instance.getActiveAccount()?.idTokenClaims as Token;
    if(c.extension_Role == "customer" || "Customer"){
      return true;
    }else{
      this.router.navigate(['/home']);
      return false;
    }
  }

}
