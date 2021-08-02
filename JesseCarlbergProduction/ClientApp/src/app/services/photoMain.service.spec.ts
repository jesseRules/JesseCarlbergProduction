import { TestBed } from '@angular/core/testing';

import { PhotoMainService } from './photoMain.service';

describe('PhotoMainService', () => {
  let service: PhotoMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
