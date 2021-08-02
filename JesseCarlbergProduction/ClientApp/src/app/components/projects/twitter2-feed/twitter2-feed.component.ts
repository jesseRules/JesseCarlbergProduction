import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { TwitterapiService } from '../../../services/twitterapi.service';
import { TwitterFeed, Tweets } from '../../../services/models/twitter2_models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-twitter2-feed',
  templateUrl: './twitter2-feed.component.html',
  styleUrls: ['./twitter2-feed.component.scss'],
})
export class Twitter2FeedComponent implements OnInit, OnDestroy {
  public cols: number;
  public rowheight = 400;
  public twitterForm;
  public twitterFeed: TwitterFeed;
  public tweets: Tweets[];
  public loading = false;
  public errors;
  public arSub: Subscription;
  public searchTerm: string = '';
  public searchUser: string = '';
  public gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1,
  };
  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private twitterapiService: TwitterapiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.arSub = this.activatedRoute.queryParams.subscribe((params) => {
      this.searchTerm = params['q'];
      this.searchUser = params['user'];

      if (this.searchTerm) {
        this.getFeedByKeyword(this.searchTerm, 100);
      }
    });

    this.twitterForm = this.fb.group({
      search: this.searchTerm,
    });

    if (this.searchUser) {
      // this.getFeedByUser(this.searchUser, 100);
    }

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
            this.rowheight = 400;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.rowheight = 400;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.rowheight = 400;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.rowheight = 400;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.rowheight = 400;
          }
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.arSub) {
      this.arSub.unsubscribe();
    }
  }

  getFeedByKeyword(term: string, tweetCount: number): void {
    this.loading = true;
    this.tweets = [];
    this.twitterapiService.getTweets2Keyword(term, tweetCount).subscribe(
      (data) => {
        this.twitterFeed = data;
        this.tweets = this.twitterFeed.tweets;
        this.loading = false;
        if (this.tweets) {
          if (this.twitterFeed.meta.result_count <= 0) {
            this.openSnackBar('No results found', '');
          }
        } else {
        }
      },

      (error) => {
        this.errors = error;
        this.loading = false;
        this.openSnackBar(this.errors, 'Error');
      },
      () => {
        this.router.navigate(['twitter2-sample'], { queryParams: { q: term } });

        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  onSubmit(): void {
    this.getFeedByKeyword(this.twitterForm.value.search, 100);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  userClick(username): void {
    this.router.navigate(['twitter2-sample'], {
      queryParams: { user: username },
    });
    // this.getFeedByUser(username, 100);
  }
}
