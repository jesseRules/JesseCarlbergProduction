import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AzurePhotoService } from '../../../services/azure-photo.service';
import { Subscription } from 'rxjs';
import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-azure-photos',
  templateUrl: './azure-photos.component.html',
  styleUrls: ['./azure-photos.component.scss'],
})
export class AzurePhotosComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  public photoForm;
  public files: File[] = [];
  public imgList = [];
  public imgListJson;
  public items: GalleryItem[];
  public log: string[] = [];
  public lightboxref;
  constructor(
    private gallery: Gallery,
    private lightbox: Lightbox,
    private fb: FormBuilder,
    private azurePhotoService: AzurePhotoService
  ) {
    this.photoForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {
    this.azurePhotoService.getImages().subscribe(
      (data) => {
        this.imgList = data;
        this.imgListJson = data;
      },

      (error) => {
        console.log(error);
      },
      () => {
        this.lightboxref = this.gallery.ref('lightbox');
        this.lightboxref.setConfig({
          imageSize: ImageSize.Contain,
          thumbPosition: ThumbnailsPosition.Top,
        });

        this.items = this.imgList.map(
          (item) => new ImageItem({ src: item, thumb: item })
        );

        this.lightboxref.load(this.items);
      }
    );
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      let resp = reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  saveForm(): void {
    console.log(this.photoForm);
    console.log(this.files);

    this.azurePhotoService.uploadImage(this.files).subscribe(
      (data) => {
        console.log(data);
      },

      (error) => {
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  onSelect(event) {
    console.log(event);
    if (this.files && this.files.length >= 2) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
    this.readFile(this.files[0]).then((fileContents) => {
      // Put this string in a request body to upload it to an API.
      console.log(fileContents);
    });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
