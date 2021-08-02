import { TestBed } from '@angular/core/testing';

import { BlogSubscriptionService } from './blog-subscription.service';

describe('BlogSubscriptionService', () => {
  let service: BlogSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
