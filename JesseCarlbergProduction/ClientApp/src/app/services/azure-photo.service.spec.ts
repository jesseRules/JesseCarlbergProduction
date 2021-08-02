import { TestBed } from '@angular/core/testing';

import { AzurePhotoService } from './azure-photo.service';

describe('AzurePhotoService', () => {
  let service: AzurePhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzurePhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
