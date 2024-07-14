import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl, API_BASE_URL } from '../constants/apiUrl';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    @Inject(HttpService) private httpService: HttpService
  ) { }

  login(username: string, password: string): Observable<any> {
    let data = {
      username: username,
      password: password,
    };
    let url = API_BASE_URL+ApiUrl.SIGN_IN;
    return this.httpService.makeHttpPostRequestWithoutToken(url, data);
  }

  register(email: string,username: string, password: string,  role: any): Observable<any> {
    let data: any = {
      password: password,
      username: username,
      role: role,
      email: email
    };
    let url = API_BASE_URL+ApiUrl.SIGN_UP;

    return this.httpService.makeHttpPostRequestWithoutToken(url, data);
  }

  logout(): Observable<any> {
    let url = API_BASE_URL+ApiUrl.SIGN_OUT;
    return this.httpService.makeHttpPostRequestWithToken(url);
  }

  addTask(data: any) : Observable<any>{
    let url = API_BASE_URL+ApiUrl.ADD_TASK;
    return this.httpService.makeHttpPostRequestWithToken(url, data);
  }

  getTask() : Observable<any>{
    let url = API_BASE_URL+ApiUrl.GET_TASK;
    return this.httpService.makeHttpPostRequestWithToken(url);
  }
  editTask(data: any) : Observable<any>{
    let url = API_BASE_URL+ApiUrl.EDIT_TASK;
    return this.httpService.makeHttpPostRequestWithToken(url,data);
  }
  getFilterTask(status:any) : Observable<any>{
    let url = API_BASE_URL+ApiUrl.GET_FILTER;
    return this.httpService.makeHttpPostRequestWithToken(url, status);
  }
  delTask(id: any): Observable<any>{
    let url = API_BASE_URL+ApiUrl.DEL_TASK;
    return this.httpService.makeHttpDeleteRequestWithToken(url, id);
  }
  resetPass(pass: any): Observable<any>{
    let url = API_BASE_URL+ApiUrl.RESET;
    return this.httpService.makeHttpPostRequestWithToken(url, pass);
  }
  getUser(user: any): Observable<any>{
    let url = API_BASE_URL+ApiUrl.GET_USER;
    return this.httpService.makeHttpGetRequestWithToken(url, user);
  }
}
