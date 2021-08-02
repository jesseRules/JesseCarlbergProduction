import { TestBed } from '@angular/core/testing';

import { TwitterapiService } from './twitterapi.service';

describe('TwitterapiService', () => {
  let service: TwitterapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
