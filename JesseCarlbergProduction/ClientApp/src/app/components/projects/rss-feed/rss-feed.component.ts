import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import * as xml2js from "xml2js";
export interface IRssData {}
@Component({
  selector: 'app-rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
})
export class RssFeedComponent implements OnInit {
  public errors;
  public loading = false;
  public rssData: NewsRss;
  public cols: number;
  public rowheight = 360;
  public gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1,
  };

  constructor(
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver
  ) {
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
            this.rowheight = 360;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.rowheight = 360;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.rowheight = 360;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.rowheight = 360;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.rowheight = 360;
          }
        }
      });
  }

  ngOnInit(): void {
    this.GetRssFeedData();
  }

  GetRssFeedData() {
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text',
    };
    this.http
      .get<any>('https://gadgets.ndtv.com/rss/feeds', requestOptions)
      .subscribe((data) => {
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.rssData = result;
        });
      });
  }
}

export interface NewsRss {
  rss: IRssObject;
}

export interface IRssObject {
  $: any;
  channel: Array<IRssChannel>;
}

export interface IRssChannel {
  'atom:link': Array<string>;
  description: Array<string>;
  image: Array<IRssImage>;
  item: Array<IRssItem>;
  language: Array<string>;
  lastBuildDate: Date;
  link: Array<string>;
  title: Array<string>;
}

export interface IRssImage {
  link: Array<string>;
  title: Array<string>;
  url: Array<string>;
}

export interface IRssItem {
  category: Array<string>;
  description: Array<string>;
  guid: any;
  link: Array<string>;
  pubDate: Date;
  title: Array<string>;
}
