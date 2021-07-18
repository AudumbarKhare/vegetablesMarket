import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

 export interface toLeave{
     canLeave:()=>Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree ;
 }

@Injectable({
  providedIn: 'root'
})
export class CanLeaveGuard implements CanDeactivate<toLeave> {
  canDeactivate(
    component: toLeave,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return component.canLeave ? component.canLeave() : true;
  }

}
