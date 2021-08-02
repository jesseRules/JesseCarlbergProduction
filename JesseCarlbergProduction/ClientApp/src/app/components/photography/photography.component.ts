import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotographyComponent implements OnInit {
  public data = [];
  public items: GalleryItem[];
  public log: string[] = [];
  public lightboxref;
  constructor(private gallery: Gallery, private lightbox: Lightbox) {}

  // https://github.com/MurhafSousli/ngx-gallery/wiki/Lightbox-Usage

  ngOnInit(): void {
    this.data = [
      {
        srcUrl: '../../../assets/photos/JES00202.jpg',
        previewUrl: '../../../assets/photos/JES00202.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES00261.jpg',
        previewUrl: '../../../assets/photos/JES00261.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES02388.jpg',
        previewUrl: '../../../assets/photos/JES02388.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES06850.jpg',
        previewUrl: '../../../assets/photos/JES06850.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES03219.jpg',
        previewUrl: '../../../assets/photos/JES03219.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES06853.jpg',
        previewUrl: '../../../assets/photos/JES06853.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES08118.jpg',
        previewUrl: '../../../assets/photos/JES08118.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES08567.jpg',
        previewUrl: '../../../assets/photos/JES08567.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES08487.jpg',
        previewUrl: '../../../assets/photos/JES08487.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES09771.jpg',
        previewUrl: '../../../assets/photos/JES09771.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES01959.jpg',
        previewUrl: '../../../assets/photos/JES01959.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES06401.jpg',
        previewUrl: '../../../assets/photos/JES06401.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES01897.jpg',
        previewUrl: '../../../assets/photos/JES01897.jpg',
      },
      {
        srcUrl: '../../../assets/photos/JES01076.jpg',
        previewUrl: '../../../assets/photos/JES01076.jpg',
      }, {
        srcUrl: '../../../assets/photos/JES03141.jpg',
        previewUrl: '../../../assets/photos/JES03141.jpg',
      }, {
        srcUrl: '../../../assets/photos/JES03258.jpg',
        previewUrl: '../../../assets/photos/JES03258.jpg',
      },
    ];
    this.lightboxref = this.gallery.ref('lightbox');
    this.lightboxref.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top,
    });

    this.items = this.data.map(
      (item) => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    );

    this.lightboxref.load(this.items);
    this.gallery.ref().load(this.items);
  }

  public onChange(index: number) {
    this.log.push(`MatCarousel#change emitted with index ${index}`);
  }
}
