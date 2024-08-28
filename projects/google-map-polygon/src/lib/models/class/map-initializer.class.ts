import { getGoogleMap } from "../../utils/google-map.util";

export class entityMapHelper {
  polygonColor = "#eb6363";
  mapContainerId: any;
  infoWindowContent: any = [];
  readonly MAP_POLYGON_EVENT: string = "mouseup";
  siteMarker: any = [];
  googleMaps: any;
  cb_funcs: any;
  readonly POLYGON_OPTIONS: google.maps.PolygonOptions = {
    fillColor: "#ffff00",
    fillOpacity: 0.1,
    strokeWeight: 2,
    clickable: true,
    editable: true,
    zIndex: 1,
    draggable: true,
    geodesic: false,
    strokeColor: "#006E42",
  };
  public map: google.maps.Map | any | null = [];
  protected drawingManager: google.maps.drawing.DrawingManager | any = [];
  protected drawingManagerOptions:
    | google.maps.drawing.DrawingManagerOptions
    | any = [];
  private mapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    minZoom: 2,
    mapTypeId: 'satellite'as google.maps.MapTypeId,
   // styles: MAP_THEME,
    streetViewControl: false,
    hasCustomControls: true,
    hasDrawingManager: true,
  };
  errorMessageForUser = "";
  protected addedFenceGeoCodes: any = [];
  protected editPolygon: google.maps.Polygon | null | any = [];
  // constructor(options?: any) {
  //   if (options) this.mapOptions = { ...this.mapOptions, ...options };
  //   this.cb_funcs = options;
  // }

  async initializeMap(mapContainer: string, id: number, disabled: boolean): Promise<any> {
    this.mapContainerId = mapContainer;
    this.mapOptions.hasCustomControls = disabled ? false : true;
    this.mapOptions.hasDrawingManager = disabled ? false : true;

    await getGoogleMap();
    const POLYGON_OPTIONS: google.maps.PolygonOptions = this.POLYGON_OPTIONS;
    this.map[this.mapContainerId + id] = new google.maps.Map(
      document.getElementById(mapContainer + id) as HTMLElement,
      this.mapOptions,
    );
    if (this.mapOptions.hasCustomControls) {
      this.createCustomControls(id);
    }
    this.configDrawingManager(id, disabled);
  }

  configDrawingManager(id: any, disabled: boolean): void {
    this.drawingManagerOptions[this.mapContainerId + id] = {
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: this.POLYGON_OPTIONS,
    };

    this.drawingManager[this.mapContainerId + id] =
      new google.maps.drawing.DrawingManager(
        this.drawingManagerOptions[this.mapContainerId + id],
      );
    this.drawingManager[this.mapContainerId + id].setMap(
      this.map[this.mapContainerId + id],
    );
    if(disabled) {
      this.drawingManager[this.mapContainerId + id].setOptions({ drawingControl: false });
      this.drawingManager[this.mapContainerId + id].setDrawingMode(null);
    }
    google.maps.event.addListener(
      this.drawingManager[this.mapContainerId + id],
      "overlaycomplete",
      (event: any) => {
        if (event.type == "polygon") {
          this.editPolygon[this.mapContainerId + id] = event.overlay;
          this.addListenerforVertexDelete(event.overlay, id);
          google.maps.event.addListener(
            event.overlay,
            this.MAP_POLYGON_EVENT,
            () => {
              this.addedFenceGeoCodes = event.overlay.getPath();
            },
          );
          this.addedFenceGeoCodes = event.overlay.getPath();
          //this.cb_funcs.CB_GeoCoordinateObj(this.getGeCoordinates());
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.drawingManager[this.mapContainerId + id]!.setDrawingMode(null);
          this.toggleDrawingMode(false, id);
          //this.getPolygonCoordinates(this.addedFenceGeoCodes);
        }
      },
    );
  }
  getGeCoordinates() {
    const coordinates = [];
    for (let i = 0; i < this.addedFenceGeoCodes.getLength(); i++) {
      const latLng = this.addedFenceGeoCodes.getAt(i);
      coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
    }
    return coordinates;
  }

  zoomLocation(location: any, id: any) {
    this.map[this.mapContainerId + id]?.setZoom(12);
    this.map[this.mapContainerId + id]?.setCenter({
      lat: location.latitude,
      lng: location.longitude,
    });
  }

  createCustomControls(id: any) {
    const centerControlDiv = document.createElement("div");
    centerControlDiv.setAttribute("id", "reset-fence-entity");
    centerControlDiv.setAttribute("class", "reset-fence-entity");
    const centerControl = this.createResetFenceControl(id);
    centerControlDiv.appendChild(centerControl);
    // const currentLocationDiv = document.createElement('div');
    //this.createCurrentLocationControl(currentLocationDiv, id);
    // this.map[this.mapContainerId + id]?.controls[
    //     google.maps.ControlPosition.RIGHT_TOP
    // ].push(currentLocationDiv);
    this.map[this.mapContainerId + id]?.controls[
      google.maps.ControlPosition.RIGHT_TOP
    ].push(centerControlDiv);
  }

  createResetFenceControl(id: any) {
    const controlButton = document.createElement("button");
    controlButton.setAttribute("id", "reset-fence");
    controlButton.setAttribute("class", "reset-fence-button");
    controlButton.textContent = "";
    controlButton.innerHTML = ` <svg class="px-refresh-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg" style="display:inline !important; margin-top: 7px;">
        <path
          d="M16.6666 9.16665C16.4628 7.70016 15.7825 6.34136 14.7304 5.29956C13.6784 4.25776 12.313 3.59074 10.8446 3.40127C9.37624 3.2118 7.88627 3.51038 6.60425 4.25102C5.32224 4.99165 4.31929 6.13326 3.74992 7.49998M3.33325 4.16665V7.49998H6.66658"
          stroke="#a7a7a8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M3.3335 11.5476C3.5373 13.0141 4.21761 14.3729 5.26963 15.4147C6.32166 16.4565 7.68703 17.1235 9.15544 17.313C10.6238 17.5025 12.1138 17.2039 13.3958 16.4632C14.6778 15.7226 15.6808 14.581 16.2502 13.2143M16.6668 16.5476V13.2143H13.3335"
          stroke="#a7a7a8" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`;
    controlButton.title = "Reset the fence";
    controlButton.type = "button";
    controlButton.addEventListener("click", () => {
      if (this.editPolygon[this.mapContainerId + id]) {
        this.editPolygon[this.mapContainerId + id].setMap(null);
        this.editPolygon[this.mapContainerId + id] = null;
        this.toggleDrawingMode(true, id);
      } else {
        if (this.addedFenceGeoCodes.length !== 0) {
          this.addedFenceGeoCodes.clear();
          this.toggleDrawingMode(true, id);
        }
      }
    });
    controlButton.addEventListener("mouseover", () => {
      controlButton.style.backgroundColor = "#d1cfcf";
    });
    controlButton.addEventListener("mouseout", () => {
      controlButton.style.backgroundColor = "white";
    });
    return controlButton;
  }

  toggleDrawingMode(drawingControl: boolean, id: any): void {
    const MAP_ID = this.mapContainerId + id;
    this.drawingManager[MAP_ID]?.setOptions({
      drawingControl,
    });
  }

  createCurrentLocationControl(controlDiv: Element, id: any) {
    const controlUI = document.createElement("div");
    controlDiv.setAttribute("id", "my-location");
    controlUI.setAttribute("class", "current-location-button");
    controlUI.title = "Go to my location";
    controlDiv.appendChild(controlUI);
    const oImg = document.createElement("img");
    oImg.setAttribute("src", "/assets/img/icons/mapicons/location.png");
    oImg.setAttribute("alt", "current location");
    oImg.setAttribute("class", "current-location-image");
    controlUI.appendChild(oImg);
    controlUI.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.map[this.mapContainerId + id]?.setZoom(16);
            this.map[this.mapContainerId + id]?.setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err): void => {
            this.errorMessageForUser =
              "Unable to fetch your location. Please enable user location.";
          },
        );
      }
    });
  }

  updatePolygonCoordinates(
    coordinates: Array<google.maps.LatLng>,
    id: any,
  ): void {
    if (coordinates && coordinates.length > 0) {
      this.toggleDrawingMode(false, id);
      this.drawingManager[this.mapContainerId + id]!?.setDrawingMode(null);
      const POLYGON_OPTIONS: google.maps.PolygonOptions = this.POLYGON_OPTIONS;
      if (!this.mapOptions.hasDrawingManager) {
        POLYGON_OPTIONS.draggable = false;
        POLYGON_OPTIONS.editable = false;
        POLYGON_OPTIONS.clickable = false;
        POLYGON_OPTIONS.fillOpacity = 0.3;
      }
      if (this.editPolygon[this.mapContainerId + id]) {
        this.editPolygon[this.mapContainerId + id].setMap(null);
      }
      this.editPolygon[this.mapContainerId + id] = new google.maps.Polygon(
        this.POLYGON_OPTIONS,
      );
      this.editPolygon[this.mapContainerId + id].setPaths(coordinates);
      this.editPolygon[this.mapContainerId + id].setMap(
        this.map[this.mapContainerId + id],
      );
      google.maps.event.addListener(
        this.editPolygon[this.mapContainerId + id],
        this.MAP_POLYGON_EVENT,
        () => {
          this.addedFenceGeoCodes =
            this.editPolygon[this.mapContainerId + id]!.getPath();
          this.editPolygonCoordinates();
        },
      );
      const bounds = new google.maps.LatLngBounds();
      for (let index = 0; index < coordinates.length; index++) {
        bounds?.extend(coordinates[index]);
        this.map[this.mapContainerId + id]?.fitBounds(bounds);
      }
      this.addListenerforVertexDelete(
        this.editPolygon[this.mapContainerId + id],
        id,
      );
    }
  }

  editPolygonCoordinates() {
    const coordinates = [];
    for (let i = 0; i < this.addedFenceGeoCodes.getLength(); i++) {
      const latLng = this.addedFenceGeoCodes.getAt(i);
      coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
    }
    //this.cb_funcs.CB_GeoCoordinateObj(coordinates);
  }

  addListenerforVertexDelete(overlay: google.maps.Polygon, id: any): void {
    google.maps.event.addListener(overlay, "contextmenu", (e: any) => {
      if (e.vertex == undefined || !this.map[this.mapContainerId + id]) {
        return;
      }
    });
  }

  getGeoCodes(id: any): any {
    if (this.editPolygon[this.mapContainerId + id])
      return this.editPolygon[this.mapContainerId + id]!.getPath();
    return "";
  }
  updateMap(mapContainer: string, id: number, properties :  any) {
    this.mapContainerId = mapContainer;
    if(this.map[this.mapContainerId + id]){
      const POLYGON_OPTIONS: google.maps.PolygonOptions = this.POLYGON_OPTIONS;
      POLYGON_OPTIONS.fillColor = properties.fillcolor;
      POLYGON_OPTIONS.strokeColor = properties.strokecolor;
      this.map[this.mapContainerId + id].setOptions(POLYGON_OPTIONS);
      this.map[this.mapContainerId + id].setMapTypeId(properties.option);
    }
  }
}
