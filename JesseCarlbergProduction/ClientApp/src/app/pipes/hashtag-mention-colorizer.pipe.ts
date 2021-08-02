import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'hmColor'
})
export class HashtagMentionColorizerPipe implements PipeTransform {
  twitterColor = '#1ca1f3';

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: any, color?: string): any {
    let tempString: string;
    const newText = text.split(/\s+/);
    const mentions = newText.filter(el => el[0] === '#' || el[0] === '@');
    for (const [index, value] of newText.entries()) {
      for (const mention of mentions) {
        if (
          value === mention ||
          value === mention + '.' ||
          // tslint:disable-next-line: quotemark
          value === mention + "'s"
        ) {
          let url = 'q=' + mention.replace('#', '').replace('@','');
          if (mention.indexOf('@') >= 0){
            url = 'user=' + mention.replace('#', '').replace('@','');
          }
          newText.splice(
            index,
            1,
            `<a href="#/twitter-sample?${url}" style="color: ${
              color ? color : this.twitterColor
            }; display: inline; cursor: pointer;">${value}</a>`
          );
        }
      }
    }
    // Fix Links
    tempString = newText.join(' ');
    const urls = newText.filter(el => el.indexOf('http') === 0 || el.indexOf('www.') === 0);
    for (const [index, value] of newText.entries()) {
      for (const url of urls) {
        if (
          value === url ||
          value === url + '.'
        ) {
          newText.splice(
            index,
            1,
            `<a href="${url}" target="_blank" style="color: ${
              color ? color : this.twitterColor
            }; display: inline; cursor: pointer;">${value}</a>`
          );
        }
      }
    }

    tempString = newText.join(' ');
    return this.sanitizer.bypassSecurityTrustHtml(tempString);
  }
}
