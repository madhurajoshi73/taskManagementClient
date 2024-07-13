import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { AUTH_USER_KEY_CONSTANT, AUTH_USER_ADMIN_KEY_CONSTANT, SELECTED_CAMERA_TYPE, ROLE } from '../CONSTANT/CONSTANT';

const USER_KEY = 'auth-user';
const ADMIT_USER_KEY = "Admin";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private jwtHelper: JwtHelperService,
  ) { }

  async clean() {
    await window.sessionStorage.clear();
  }

  public saveUser(data: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, data.body.token);
  }

  public getTokenBody(): any {
    return window.sessionStorage.getItem(USER_KEY);
  }

  public getAdminTokenBody(): any {
    return window.sessionStorage.getItem(ADMIT_USER_KEY);
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  public getUser(): any {
    const tokenBody = this.getTokenBody();
    const decodeToken = this.jwtHelper.decodeToken(tokenBody);

    if (decodeToken) {
      return decodeToken;
    }

    return {};
  }

  async decodeAndSetToken(token: any, adminToken: any = null) {
    const decodeToken = await this.jwtHelper.decodeToken(token);

    if (decodeToken) {
      await window.sessionStorage.removeItem(USER_KEY);
      await window.sessionStorage.setItem(USER_KEY, token);
      if (adminToken) {
        await window.sessionStorage.removeItem(ADMIT_USER_KEY);
        await window.sessionStorage.setItem(ADMIT_USER_KEY, adminToken);
      }
      await window.location.reload();
      return true;
    } else {
      return false;
    }
  }
}

