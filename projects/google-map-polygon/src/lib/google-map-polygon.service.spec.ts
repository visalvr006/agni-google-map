import { TestBed } from '@angular/core/testing';

import { GoogleMapPolygonService } from './google-map-polygon.service';

describe('GoogleMapPolygonService', () => {
  let service: GoogleMapPolygonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapPolygonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
