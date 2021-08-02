import { TestBed } from '@angular/core/testing';

import { ErrorUtilitiesService } from './error-utilities.service';

describe('ErrorUtilitiesService', () => {
  let service: ErrorUtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorUtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
