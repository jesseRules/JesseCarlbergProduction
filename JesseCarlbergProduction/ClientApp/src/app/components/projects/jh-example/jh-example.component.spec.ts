import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JhExampleComponent } from './jh-example.component';

describe('JhExampleComponent', () => {
  let component: JhExampleComponent;
  let fixture: ComponentFixture<JhExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JhExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JhExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
