import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public error: any;
  public busy = false;
  public username = '';
  public password = '';
  public loginError = false;
  public hide = true;
  public loading = false;
  public emailNotConfirmed = false;
  private subscription: Subscription | undefined;
  private authsubscription: Subscription | undefined;
  private antiforgesubscription: Subscription | undefined;
  private resendSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.antiForgeryToken();

    this.subscription = this.authService.user$.subscribe((x) => {
      if (this.route.snapshot.url[0].path === 'login') {
        this.loggingService.logPageView('Login', this.route.snapshot.url[0].path);
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (x && accessToken && refreshToken) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.loggingService.logPageView('Login Redirect', returnUrl);
          this.router.navigate([returnUrl]);
        }
      } // optional touch-up: if a tab shows login page, then refresh the page to reduce duplicate login
    });
  }

  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.authsubscription?.unsubscribe();
    this.antiforgesubscription?.unsubscribe();
    this.resendSubscription?.unsubscribe();
  }

  antiForgeryToken() {
    this.antiforgesubscription = this.authService
      .getAntiForgeryToken()
      .subscribe(
        () => {},
        (error) => {
          this.openSnackBar(error, 'Error');
         this.loggingService.logException(error);
        }
      );
  }

  login() {
    this.username = this.form.value.username;
    this.password = this.form.value.password;

    if (!this.username || !this.password) {
      return;
    }
    this.busy = true;
    this.loading = true;
    this.emailNotConfirmed = false;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.authsubscription = this.authService
      .login(this.username, this.password)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate([returnUrl]);
        },
        (error) => {
          this.loading = false;
          this.loginError = true;
          this.antiForgeryToken();
          this.openSnackBar('Unauthorized', 'Login');
          if (error) {
            if (error == 'Unauthorized: Email is not confirmed') {
              this.emailNotConfirmed = true;
            }
            this.loggingService.logException(error);
          }
        }
      );
  }

  resendEmail() {
    this.username = this.form.value.username;
    this.resendSubscription = this.authService
      .resendConfirmationEmail(this.username)
      .subscribe(
        () => {
          this.form.reset();
          this.emailNotConfirmed = false;
          this.openSnackBar('Email Sent! Check your inbox', 'Success');
        },
        (error) => {
          this.openSnackBar(error, 'Error');
          this.loggingService.logException(error);
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
