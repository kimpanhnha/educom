import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.take(1)
    .map(user => !!user).do(async loggedIn => {
      if (loggedIn) {
    return true;
  }

  this.router.navigate(['/login'],
  { queryParams: { returnUrl: state.url } });
  return false;
    })
  }
}

