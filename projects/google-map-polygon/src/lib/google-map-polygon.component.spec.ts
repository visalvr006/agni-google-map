import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapPolygonComponent } from './google-map-polygon.component';

describe('GoogleMapPolygonComponent', () => {
  let component: GoogleMapPolygonComponent;
  let fixture: ComponentFixture<GoogleMapPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapPolygonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
