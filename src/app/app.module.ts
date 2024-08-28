import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { agniGeoAreaModule } from 'projects/google-map-polygon/src/lib/google-map-polygon.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    agniGeoAreaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
