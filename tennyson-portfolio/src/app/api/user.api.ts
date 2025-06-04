import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, UserResponse, LoginResponse } from '../types/user.types';

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  private baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  /**
   * Login or signup - creates user if doesn't exist
   */
  loginOrSignup(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginData);
  }

} 