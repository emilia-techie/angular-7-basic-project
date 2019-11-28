import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { AppConstants } from '../constant'

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {
  loggedIn: String;
  httpOptions: Object;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': localStorage.token
      })
    };
  }

  /*Call post services */
  callPostService(url, data) {
    return this.http.post<any>(AppConstants.baseURL + url, data).pipe(map(resp => {
      return resp;
    }));
  }

  /*Call get services */
  callGetService(url) {
    return this.http.get<any>(AppConstants.baseURL + url).pipe(map(resp => {
      return resp;
    }));
  }

  /*Call put services */
  callPutService(url, data) {
    return this.http.put<any>(AppConstants.baseURL + url, data, this.httpOptions).pipe(map(resp => {
      console.log("calling get api ", resp);
      return resp;
    }));
  }

  /*Call delete services */
  callDeleteService(url) {
    return this.http.delete<any>(AppConstants.baseURL + url, this.httpOptions).pipe(map(resp => {
      console.log("calling delete api ", resp);
      return resp;
    }));
  }

  /*post service with upload file */
  postFormDataToService(url, formData) {
    try {
      return this.http.post(AppConstants.baseURL + url, formData, this.httpOptions);
    } catch (e) {
      console.log("Exception ApiService postFormDataToService " + e);
    }
  }

  putFormDataToService(url: any, formData: any) {
    try {
      return this.http.put(AppConstants.baseURL + url, formData, this.httpOptions);
    } catch (e) {
      console.log("Exception ApiService postFormDataToService " + e);
    }
  }

  /*Check if user is loggedin */
  isUserLoggedIn() {
    this.loggedIn = localStorage.getItem('isUserLoggedIn');
    return this.loggedIn;
  }

  /*logout */
  logout() {
    localStorage.clear();
  }

}
