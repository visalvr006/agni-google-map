import { NgModule } from '@angular/core';
import { GoogleMapPolygonComponent } from './google-map-polygon.component';
import { GoogleMapContainerComponent } from './modules/google-map-container/google-map-container.component';



@NgModule({
  declarations: [
    GoogleMapPolygonComponent,
    GoogleMapContainerComponent
  ],
  imports: [
  ],
  exports: [
    GoogleMapPolygonComponent,
    GoogleMapContainerComponent
  ]
})
export class agniGeoAreaModule { }
