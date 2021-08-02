import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ConfirmedValidator } from './validators/confirmed.validator';
import { CustomValidators } from './validators/custom-validators';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  public error: any;
  public busy = false;
  public loading = false;
  public username = '';
  public password = '';
  public loginError = false;
  public form: FormGroup = new FormGroup({});
  private subscription: Subscription = new Subscription();
  private forgesubscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.minLength(8),
          Validators.required, // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true,
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true,
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true,
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true,
            }
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: ConfirmedValidator('password', 'confirmPassword') }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.forgesubscription?.unsubscribe();
  }

  antiForgeryToken() {
    this.forgesubscription = this.authService.getAntiForgeryToken().subscribe(
      () => {},
      (error) => {
        this.openSnackBar(error.Message, 'Login');
      }
    );
  }

  register() {
    if (!this.form.valid) {
      return;
    }

    this.username = this.form.value.email;
    this.password = this.form.value.password;

    if (!this.username || !this.password) {
      return;
    }
    this.busy = true;
    this.loading = true;
    let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.authService
      .register(this.username, this.username, this.password)
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(
        () => {
          this.loading = false;
          if (!returnUrl) {
            returnUrl = '/login';
          }
          this.router.navigate([returnUrl]);
        },
        (error) => {
          this.loginError = true;
          this.loading = false;
          this.openSnackBar(error.Message, 'Error');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
