import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapProjectComponent } from './map-project.component';

describe('MapProjectComponent', () => {
  let component: MapProjectComponent;
  let fixture: ComponentFixture<MapProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
