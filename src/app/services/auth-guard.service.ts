import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ROLE, ROLEWISE_ROUTE_URL } from '../constants/CONSTANTS';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any{

    let cur_url = state.url;
    let url_params: any = route.queryParams;

    if (this.storageService.isLoggedIn()) {

      let user = this.storageService.getUser();
      let role = user.role[0];

      if (route.data['requiredRoles']) {
        const requiredRoles = route.data['requiredRoles'];
        if (requiredRoles.includes(role)) {
          if (url_params?.deleteToken) {
            this.storageService.clean();
            setInterval(() => {
              this.router.navigate(['/login'], { queryParams: { token: url_params.userToken, adminToken: url_params.adminToken } })
            }, 1000);
            return false;
          } 

        } else {
          this.redirectingLoggedInUserToDashboard(role);
          return true;
        }
      } else {
        this.redirectingLoggedInUserToDashboard(role);
        return true;
      }

    } else if (route.routeConfig?.path == 'login' || route.routeConfig?.path == 'register') {

      if (url_params?.token) {
        return this.storageService.decodeAndSetToken(url_params.token, url_params?.adminToken);

      }else if (cur_url == '/login' ||
      cur_url == '/register' ){
      return true;
    }  else {
        this.router.navigate(['/login']);
        return false;
      }

    }
    else{
      this.router.navigate(['/login']);
        return false;
    }

  }
  redirectingLoggedInUserToDashboard(role: any) {
    if (ROLE.ADMIN == role) {
      this.router.navigate([ROLEWISE_ROUTE_URL.ADMIN]);
    } else if (ROLE.HR == role) {
      this.router.navigate([ROLEWISE_ROUTE_URL.HR]);
    } else if (ROLE.EMPLOYEE == role) {
      this.router.navigate([ROLEWISE_ROUTE_URL.EMPLOYEE]);
    }
  }
}
