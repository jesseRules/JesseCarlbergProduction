import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Twitter2FeedComponent } from './twitter2-feed.component';

describe('Twitter2FeedComponent', () => {
  let component: Twitter2FeedComponent;
  let fixture: ComponentFixture<Twitter2FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Twitter2FeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Twitter2FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
