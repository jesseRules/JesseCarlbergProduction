import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-ytube-example',
  templateUrl: './ytube-example.component.html',
  styleUrls: ['./ytube-example.component.scss'],
})
export class YtubeExampleComponent implements OnInit, AfterViewInit {

  public screenHeight;
  public screenWidth;
  public videoURL: string = 'https://www.youtube.com/embed/OXgF9GeoX8o';
  public safeURL;
  public ytHeight = 300;
  public ytWidth = 600;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight - 250;
    this.screenWidth = window.innerWidth;
    this.ytWidth = this.screenWidth - (this.screenWidth * .11) - 30;
    if (this.ytWidth >= 600) {
      this.ytWidth = 600;
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.onResize();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit() {

  }

  copyText(event) {
    this.clipboardService.copy('npm install @angular/youtube-player');
  }
}
