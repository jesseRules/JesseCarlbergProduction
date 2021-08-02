import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public loading = false;
  public error: any;
  public username = '';
  private authsubscription: Subscription = new Subscription();
  private antiforgesubscription: Subscription = new Subscription();
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.antiForgeryToken();
  }
  ngOnDestroy(): void {
    this.authsubscription?.unsubscribe();
    this.antiforgesubscription?.unsubscribe();
  }

  antiForgeryToken() {
    this.antiforgesubscription = this.authService
      .getAntiForgeryToken()
      .subscribe(
        () => {},
        (error) => {
          this.openSnackBar(error, 'Error');
        }
      );
  }

  forgotPassword() {
    this.username = this.form.value.username;

    this.authService.forgotPassword(this.username).subscribe(
      () => {
        this.form.reset();
        this.loading = false;
        this.openSnackBar('Email Sent! Check your inbox', 'Success');
        this.router.navigate(['login']);
      },
      (error) => {
        this.openSnackBar(error, 'Error');
        this.loading = false;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
