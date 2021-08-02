import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmleditorComponent } from './htmleditor.component';

describe('HtmleditorComponent', () => {
  let component: HtmleditorComponent;
  let fixture: ComponentFixture<HtmleditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmleditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmleditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
