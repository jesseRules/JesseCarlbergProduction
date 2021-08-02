import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from './models/ApplicationUser';
import { environment } from 'src/environments/environment';
import { RegisterResponse } from './models/RegisterResponse';

interface LoginResult {
  token: string;
  expiration: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private timer: Subscription = new Subscription();
  private _user = new BehaviorSubject<ApplicationUser | null>(null);
  user$: Observable<ApplicationUser | null> = this._user.asObservable();

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.stopTokenTimer();
        this._user.next(null);
      }
      if (event.key === 'login-event') {
        this.stopTokenTimer();
        this.http.get<LoginResult>('/api/Auth/login').subscribe((x) => {
          this._user.next({
            token: x.token,
            expiration: x.expiration,
          });
        });
      }
    }
  }

  constructor(private router: Router, private http: HttpClient) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResult>('/api/Auth/login', { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            token: x.token,
            expiration: x.expiration,
          });
          this.setLocalStorage(x);
          this.startTokenTimer();
          return x;
        })
      );
  }

  logout() {
    this.http
      .post<unknown>('/api/Auth/logout', {})
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this._user.next(null);
          this.stopTokenTimer();
          this.router.navigate(['login']);
        })
      )
      .subscribe();
  }

  // refreshToken() {
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   if (!refreshToken) {
  //     this.clearLocalStorage();
  //     return of(null);
  //   }

  //   return this.http
  //     .post<LoginResult>('/api/Auth/refresh-token', { refreshToken })
  //     .pipe(
  //       map((x) => {
  //         this._user.next({
  //           token: x.token,
  //           expiration: x.expiration
  //         });
  //         this.setLocalStorage(x);
  //         this.startTokenTimer();
  //         return x;
  //       })
  //     );
  // }

  resendConfirmationEmail(email: string): Observable<any> {
    return this.http.post<RegisterResponse>(
      '/api/Auth/resend-email-confirmation',
      { email: email }
    );
  }

  confirmEmail(email: string, token: string): Observable<any> {
    token = decodeURIComponent(token);
    return this.http.post<any>('/api/Auth/EmailConfirmation', {
      email: email,
      token: token,
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>('/api/Auth/ForgotPassword', {
      email: email
    });
  }

  getAntiForgeryToken(): Observable<any> {
    return this.http.get<any>('/api/AntiForgery/antiforgery');
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/Auth/register', {
      username: username,
      email: email,
      password: password
    });
  }

  resetPassword(
    email: string,
    password: string,
    confirmPassword: string,
    token: string
  ): Observable<any> {

    return this.http.post<any>('/api/Auth/ResetPassword', {
      password: password,
      email: email,
      confirmPassword: confirmPassword,
      token: token,
    });
  }

  resetPasswordApp(
    email: string,
    password: string,
    confirmPassword: string,
  ): Observable<any> {

    return this.http.post<any>('/api/Auth/ResetPasswordApp', {
      password: password,
      confirmPassword: confirmPassword,
      email: email
    });
  }

  setLocalStorage(x: LoginResult) {
    localStorage.setItem('access_token', x.token);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    // this.timer = of(true)
    //   .pipe(
    //     delay(timeout),
    //     tap(() => this.refreshToken())
    //   )
    //   .subscribe();
  }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }
}
