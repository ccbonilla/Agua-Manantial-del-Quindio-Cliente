import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { Auth } from 'src/app/models/auth';
import { ResponseModel } from 'src/app/models/response.model';
import { HttpService } from '../http/http.service';
@Injectable()
export class UserService {
  private BASE_URL: string = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  get(url: string): Observable<User[]> {
    return this.http
      .get(`${this.BASE_URL}/${url}`)
      .pipe(map((response) => response as User[]));
  }
  create(url: string, data: User): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/${url}`, data) 
      .pipe(map((response) => response));
  }
  updateUser(url: string, user: User): Observable<User> {
    return this.http
      .put(`${this.BASE_URL}/${url}`, user)
      .pipe(map((response) => response as User));
  }
  getById(url: string): Observable<User> {
    return this.http
      .get(`${this.BASE_URL}/${url}`)
      .pipe(map((response) => response as User));
  }
  login(email: string, password: string) {
    const body = { email, password };
    const url = `${this.BASE_URL}/login`;
    return this.http.post<Auth>(url, body).pipe(
      tap((resp) => {
        console.log('resp : ', resp);
      }),
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }
}
