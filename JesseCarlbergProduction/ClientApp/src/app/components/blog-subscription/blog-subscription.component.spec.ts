import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSubscriptionComponent } from './blog-subscription.component';

describe('BlogSubscriptionComponent', () => {
  let component: BlogSubscriptionComponent;
  let fixture: ComponentFixture<BlogSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
