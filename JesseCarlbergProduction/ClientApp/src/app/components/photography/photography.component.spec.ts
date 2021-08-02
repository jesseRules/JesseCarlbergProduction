import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhotographyComponent } from './photography.component';

describe('PhotographyComponent', () => {
  let component: PhotographyComponent;
  let fixture: ComponentFixture<PhotographyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
