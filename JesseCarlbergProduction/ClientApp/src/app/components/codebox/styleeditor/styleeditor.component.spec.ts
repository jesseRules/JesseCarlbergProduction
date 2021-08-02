import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleeditorComponent } from './styleeditor.component';

describe('StyleeditorComponent', () => {
  let component: StyleeditorComponent;
  let fixture: ComponentFixture<StyleeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StyleeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
