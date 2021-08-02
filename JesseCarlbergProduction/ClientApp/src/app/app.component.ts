import { Component, HostBinding, Inject, HostListener, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
    // public bugReport: BugReport;
    public customExceptionMessage: String = '';
    public error: HttpErrorResponse;
    // public errorLinks: LinkInfo[];
    public errorMessage: string;
    public errorTitle: string;
    public jsessionid: string;
    // public permissionInfo: PermissionInfo;
    // public routes: AppRouterLink[] = [];
    public isIframe = false;
    public loggedIn = false;
    private readonly _destroying$ = new Subject<void>();
    public showAccount: Boolean = true;
    public showComm: Boolean = true;
    public showInfo: Boolean = true;
    public showSFCases: Boolean = false;
    public title = 'Jesse Rules';
    public userId: String = '';
    public opened: boolean;
    constructor(
        private cookieService: CookieService,
        private route: ActivatedRoute,
        private router: Router,
        public overlayContainer: OverlayContainer
    ) {
        this.getPermissions();
    }
    ngOnInit(): void {

    }

    ngAfterContentInit() {

    }

    ngOnDestroy() {


    }

    onSetTheme(theme) {

    }

    checkAccount() {
      //this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
    }

    getPermissions(): void {
    }

    sendBugReport(title: string, error_msg: string, error_type: string): void {
    }

    setJsessionId(jsessionid: string = null) {
    }

    logout() {
      //this.authService.logout();
    }

}


