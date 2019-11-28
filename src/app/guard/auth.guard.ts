import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ApiCallsService } from '../service/api-calls.service'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private apiCall: ApiCallsService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.apiCall.isUserLoggedIn()) {
      return new Observable<boolean>(observer => {
        observer.next(true);
        observer.complete();
      });
    } else {
      this.router.navigate(['/login']);
      return of(false);
      // return new Observable<boolean>(observer => {
      //   observer.next(true);
      //   observer.complete();
      // });
    }
  }
}
