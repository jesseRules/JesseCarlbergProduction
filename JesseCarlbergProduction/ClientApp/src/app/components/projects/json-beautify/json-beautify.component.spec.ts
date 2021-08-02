import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonBeautifyComponent } from './json-beautify.component';

describe('JsonBeautifyComponent', () => {
  let component: JsonBeautifyComponent;
  let fixture: ComponentFixture<JsonBeautifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonBeautifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonBeautifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
