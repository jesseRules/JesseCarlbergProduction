import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('searchForm') searchFormField: ElementRef | undefined;
  private subscription: Subscription | undefined;
  public showLogout = false;
  public routerSubscription: Subscription | undefined;
  public breakPointSubscription: Subscription | undefined;
  public isLoading = false;
  public isMobile: boolean = true;
  public errorMsg: string | undefined;
  public opened: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((x) => {
      if (x) {
        this.showLogout = true;
      } else {
        this.showLogout = false;
      }
    });

    this.breakPointSubscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Handset,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.isMobile = true;
          }
          if (result.breakpoints[Breakpoints.Handset]) {
            this.isMobile = true;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.isMobile = true;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.isMobile = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.isMobile = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.isMobile = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.breakPointSubscription?.unsubscribe();
  }

  closeNav(): void {
    console.log('here');
    this.opened = false;
  }
}
