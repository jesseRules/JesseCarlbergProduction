import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tweets } from './models/twitter_models';
import { TwitterFeed } from './models/twitter2_models';

@Injectable({
  providedIn: 'root'
})
export class TwitterapiService {

  constructor(private https: HttpClient) { }
  public getTweetsbyUser(twitterUser: string, tweetCount: number)
  {
    return this.https.get<tweets[]>('api/Twitter/byuser?userName=' + twitterUser + "&tweetCount=" + tweetCount);
  }
  public getTweetsKeyword(keyword: string, tweetCount: number)
  {
    return this.https.get<tweets[]>('api/Twitter/byterm?keyword=' + keyword + "&tweetCount=" + tweetCount);
  }

  public getTweets2Keyword(keyword: string, tweetCount: number)
  {
    return this.https.get<TwitterFeed>('api/Twitter2/search?keyword=' + keyword + "&tweetCount=" + tweetCount);
  }
}
