import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurePhotosComponent } from './azure-photos.component';

describe('AzurePhotosComponent', () => {
  let component: AzurePhotosComponent;
  let fixture: ComponentFixture<AzurePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurePhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
