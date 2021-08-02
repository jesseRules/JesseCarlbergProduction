import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
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
import { Chart } from 'chart.js';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<
    MatCarouselSlideComponent
  >;
  private barChart = [];
  private data = [];
  private labels = [];
  public slidesList = new Array<any>();
  public showContent = false;
  public items: GalleryItem[];
  public log: string[] = [];
  public lightboxref;
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
  public cols: number;
  public rowheight = 300;
  public mentoringTxt = 'Mentoring/Training';
  public sixTxt = 'Six Sigma/LEAN Problem Solving';
  public gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1,
  };
  constructor(private gallery: Gallery, private lightbox: Lightbox, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        this.mentoringTxt = 'Mentoring/Training';
        this.sixTxt = 'Six Sigma/LEAN Problem Solving';
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
            this.rowheight = 340;
            this.hideArrows = true;
            this.hideIndicators = true;
            this.sixTxt = 'Six Sigma/ LEAN Problem Solving';
            this.mentoringTxt = 'Mentoring/ Training';
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.rowheight = 380;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.rowheight = 400;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.rowheight = 420;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.rowheight = 420;
            this.hideArrows = true;
            this.hideIndicators = false;
          }
        }
      });
  }

  public imgData = [     {
    srcUrl: '../../../assets/photos/JES07649.jpg',
    previewUrl: '../../../assets/photos/JES07649.jpg',
  },
  {
    srcUrl: '../../../assets/photos/JES08487.jpg',
    previewUrl: '../../../assets/photos/JES08487.jpg',
  },
  {
    srcUrl: '../../../assets/photos/JES06164.jpg',
    previewUrl: '../../../assets/photos/JES06164.jpg',
  },
  {
    srcUrl: '../../../assets/photos/JES08021.jpg',
    previewUrl: '../../../assets/photos/JES08021.jpg',
  }];

  ngOnInit(): void {
    this.labels = [
      'Javascript',
      'C#',
      'Java',
      'SQL/DB',
      'Angular',
      'HTML/CSS',
      'Dev/Ops',
    ];
    this.data = [8, 7, 2, 7, 5, 8, 3];
    this.barChart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            fill: true,
            backgroundColor: ["red", "blue", "green", "orange", "magenta", "purple", "yellow"],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: 'category',
              labels: this.labels,
              display: true,
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 10
              },
              labelString: 'Years',
              display: false,
            },
          ],
        },
      },
    });

    this.lightboxref = this.gallery.ref('lightbox');
    this.lightboxref.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
    });

    this.items = this.imgData.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    this.lightboxref.load(this.items);

    const slide = {
      img: '../../../assets/reviews/intuitivereview.png',
    };
    this.slidesList.push(slide);
    const slide1 = {
      img: '../../../assets/reviews/normaldatareview.png',
    };
    this.slidesList.push(slide1);
    const slide2 = {
      img: '../../../assets/reviews/attentionreview.png',
    };
    this.slidesList.push(slide2);
    const slide3 = {
      img: '../../../assets/reviews/endreview.png',
    };
    this.slidesList.push(slide3);

    const slide4 = {
      img: '../../../assets/reviews/jeffreview.png',
    };
    this.slidesList.push(slide4);

    const slide5 = {
      img: '../../../assets/reviews/excelreview.png',
    };
    this.slidesList.push(slide5);
  }

  public resetSlides(): void {
    this.carouselSlides.forEach((item) => (item.disabled = false));
  }

  public onChange(index: number) {
    this.log.push(`MatCarousel#change emitted with index ${index}`);
  }
}
