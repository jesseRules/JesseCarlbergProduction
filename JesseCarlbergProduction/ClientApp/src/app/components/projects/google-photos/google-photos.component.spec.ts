import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePhotosComponent } from './google-photos.component';

describe('GooglePhotosComponent', () => {
  let component: GooglePhotosComponent;
  let fixture: ComponentFixture<GooglePhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglePhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
