import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewChecked,
} from '@angular/core';
import {
  MatCarouselComponent,
} from '../../modules/app-carousel/carousel.component';
import {
  MatCarouselSlideComponent,
} from '../../modules/app-carousel/carousel-slide/carousel-slide.component';
import {
  Orientation,
  MatCarousel,
} from '../../modules/app-carousel/carousel';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navmenu', { static: true })
  navRef: ElementRef;
  @ViewChild('awardsSection')
  awardsRef: ElementRef;
  @ViewChild('projects')
  projectsRef: ElementRef;
  @ViewChild('maps')
  mapsRef: ElementRef;
  @ViewChild('bigdata')
  dataRef: ElementRef;
  @ViewChildren(MatCarouselSlideComponent)
  public carouselSlides: QueryList<MatCarouselSlideComponent>;
  private barChart = [];
  private data = [];
  private labels = [];
  public slidesList = new Array<any>();
  public showContent = false;
  public parentHeight = 'auto';
  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public hideArrows = false;
  public hideIndicators = false;
  public maxWidth = 'auto';
  public maintainAspectRatio = true;
  public proportion = 25;
  public slideHeight = '200px';
  public slides = this.slidesList.length;
  public overlayColor;
  public color = '#010101';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation: Orientation = 'ltr';
  public log: string[] = [];
  public scrollingSubscription: Subscription;
  public lastOffset;
  public navTop = 515;
  public showNav = false;
  public cols: number;
  public rowheight = 500;
  public gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1,
  };
  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private breakpointObserver: BreakpointObserver,
    private ref: ChangeDetectorRef
  ) {
    this.scrollingSubscription = this.scrollDispatcher
      .scrolled()
      .subscribe((data: CdkScrollable) => {
        this.onWindowScroll(data);
      });

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
            this.rowheight = 620;
           // console.log('zs');
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.rowheight = 630;
           // console.log('small');
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.rowheight = 650;
           // console.log('med');
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.rowheight = 680;
           // console.log('lg');
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.rowheight = 700;
          //  console.log('xl');
          }
        }
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.navRef) {
      this.navTop = this.navRef.nativeElement.offsetTop;
      this.ref.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollingSubscription) {
      this.scrollingSubscription.unsubscribe();
    }
  }

  onWindowScroll(data: CdkScrollable) {
    if (data) {
      const scrollTop = data.getElementRef().nativeElement.scrollTop || 0;
      this.navTop = this.navRef.nativeElement.offsetTop;
      if (scrollTop > this.navTop) {
        if (!this.showNav) {
          this.showNav = true;
          this.ref.detectChanges();
        }
      } else if (scrollTop <= this.navTop) {
        if (this.showNav) {
          this.showNav = false;
          this.ref.detectChanges();
        }
      } else {
        if (this.showNav) {
          this.showNav = false;
          this.ref.detectChanges();
        }
      }
    }
  }

  showNavMethod() {
    return this.showNav;
  }

  scroll(element) {
    if (element === 'awards') {
      this.awardsRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (element === 'projects') {
      this.projectsRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (element === 'maps') {
      this.mapsRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (element === 'bigdata') {
      this.dataRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
