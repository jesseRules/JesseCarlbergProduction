import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TseditorComponent } from './tseditor.component';

describe('TseditorComponent', () => {
  let component: TseditorComponent;
  let fixture: ComponentFixture<TseditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TseditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TseditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
