import { TestBed } from '@angular/core/testing';

import { JhExampleService } from './jh-example.service';

describe('JhExampleService', () => {
  let service: JhExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JhExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
