import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  baseUrl= "http://localhost:3000/"
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }
  public makeHttpDeleteRequestWithToken(url: string, data?: any, timeOut?: any) {
    return this.makeHttpRequest(url, 'DELETE', data, true, timeOut);
  }
  public makeHttpPostRequestWithToken(url: string, data?: any, timeOut?: any) {
    return this.makeHttpRequest(url, 'POST', data, true, timeOut);
  }
  public makeHttpPostRequestWithoutToken(url: string, data?: any, timeOut?: any) {
    return this.makeHttpRequest(url, 'POST', data, false, timeOut);
  }
  public makeHttpGetRequestWithToken(url: string, data?: any, timeOut?: any) {
    return this.makeHttpRequest(url, 'GET', data, true, timeOut);
  }
  private makeHttpRequest(url: string, requestMethod: string, data?: any, needToken?: boolean, timeOut?: any, isMediaPost?: any, testApiAccessToken?: any) {
    timeOut = timeOut || 30000;
    url = this.baseUrl + url;
    let httpOptions: any;
    let contentType = { 
      'Content-Type': 'application/json',
    }

    httpOptions = {
        headers: new HttpHeaders(contentType),
        body: '',
        responseType: 'json' as 'json',
        observe: 'response' as 'response'
    };
  if (needToken) {
        const accessToken = this.storageService.getTokenBody();
        if (accessToken) {
            httpOptions.headers = httpOptions.headers.append('Authorization', accessToken);
        }
    }
    if (data) {
        if (requestMethod !== 'GET') {
            httpOptions.body = data;
        } else {
            let params = new HttpParams();
            // data should be a JSON object having 'key' must be 'string' and 'value' should not be an 'object/array'
            for (const key in data) {
                if (typeof data[key] === 'boolean' || typeof data[key] === 'number' || typeof data[key] === 'string') {
                    params = params.append(key, data[key].toString());
                }
            }
            // requestOptions.clone({params:params});
            httpOptions['params'] = params;
        }
    }
    return this.http.request(requestMethod, url, httpOptions);
  }
}
