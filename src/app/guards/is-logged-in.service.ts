import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class IsLoggedInService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuth = this.auth.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}
