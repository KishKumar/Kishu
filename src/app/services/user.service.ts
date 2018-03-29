import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { IUser, IUserResponse } from '../models/user';
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {


  // API url 
  private API_URL: string = environment.webAPI + '/user';


  /**
   * Creating HttpClient object to send AJAX request
   * @param  {HttpClient} private_http
   */
  constructor(private _http: HttpClient) { }


  /**
   * This service will get user(s) information
   * @param  {string} id?
   * @returns Observable
   */
  getUser(id?: string): Observable<IUserResponse> {
    return this._http.get<IUserResponse>(this.API_URL + (id != undefined ? `/${id}` : ''));
  }

  /**
   * This service will add user information
   * @param  {IUser} user
   * @returns Observable
   */
  createUser(user: IUser): Observable<IUserResponse> {
    return this._http.post<IUserResponse>(this.API_URL, user);
  }


  /**
   * This service will update user infomarion based on user id
   * @param  {string} id
   * @param  {IUser} user
   * @returns Observable
   */
  updateUser(id: string, user: IUser): Observable<IUserResponse> {
    return this._http.post<IUserResponse>(this.API_URL + id ? `/${id}` : '', user);
  }


  /**
   * This service will delete user infomarion based on user id
   * @param  {string} id
   * @returns Observable
   */
  deleteUser(id: string): Observable<IUserResponse> {
    return this._http.delete<IUserResponse>(this.API_URL + `/${id}`);
  }
}
