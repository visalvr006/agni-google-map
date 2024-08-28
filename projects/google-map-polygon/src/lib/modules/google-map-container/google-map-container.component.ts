import { Component, Input, OnInit } from '@angular/core';
import { entityMapHelper } from '../../models/class/map-initializer.class';

@Component({
  selector: 'agni-google-fence-map',
  templateUrl: './google-map-container.component.html',
  styleUrls: ['./google-map-container.component.css']
})
export class GoogleMapContainerComponent  extends entityMapHelper implements OnInit {
  @Input() fieldId: any;
  constructor() {
    super()
   }

  ngOnInit() {
    this.initializeMap("entityAreaMap", this.fieldId, false);
  }

}
