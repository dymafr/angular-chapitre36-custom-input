import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputAddressComponent),
    },
  ],
})
export class InputAddressComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  private accessToken =
    'pk.eyJ1IjoiZHltYWZyIiwiYSI6ImNsODNjMmp4MTAwY2UzcHA4ZWhmaG5sNDAifQ.ozVmzxmotxaZbXfnvHKYDw';
  private onChange: any;
  private onTouched: any;
  private autocomplete!: MapboxGeocoder;
  private map!: mapboxgl.Map;
  private marker!: mapboxgl.Marker;
  public innerValue!: {
    address: string;
    lat: number;
    lng: number;
  };

  @ViewChild('map', { static: true }) public mapEl!: ElementRef;

  constructor() {}

  ngOnInit() {}

  writeValue(value: any) {
    this.innerValue = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {}

  ngAfterViewInit() {
    this.autocomplete = new MapboxGeocoder({
      accessToken: this.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });

    this.autocomplete.on('result', (e: any) => {
      if (e.result) {
        this.innerValue.lat = e.result.center[1];
        this.innerValue.lng = e.result.center[0];
        this.innerValue.address = e.result.place_name;
        this.onChange(this.innerValue);
        this.addMarker();
      }
    });

    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: this.mapEl.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
      center: [this.innerValue.lng, this.innerValue.lat],
    });

    this.addMarker();

    this.map.addControl(this.autocomplete);
  }

  private addMarker() {
    if (this.marker) {
      this.marker.remove();
    }
    this.marker = new mapboxgl.Marker()
      .setLngLat([this.innerValue.lng, this.innerValue.lat])
      .addTo(this.map);
  }
}
