import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss'],
})
export class EmailValidationComponent implements OnInit {
  public email = '';
  public token = '';
  private authsubscription: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['token'];

    if (this.email && this.token) {
      this.verifyEmail();
    } else {
      this.router.navigate(['/login']);
    }
  }

  verifyEmail() {
    this.authService.confirmEmail(this.email, this.token).subscribe(
      () => {
        this.openSnackBar('Your email address was confirmed', 'Success');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.openSnackBar(error, 'Error');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
