import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, forwardRef } from '@angular/core';
import places from 'places.js';
import * as leaflet from 'leaflet';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef( () => InputAddressComponent )
    }
  ]
})
export class InputAddressComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  private onChange;
  private onTouched;
  private autocomplete;
  public map;
  public innerValue = {
    address: '',
    lat: 0.00,
    lng: 0.00
  };

  @ViewChild('ref', { static: true }) public el: ElementRef;
  @ViewChild('map', { static: true }) public mapEl: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value) {
    this.innerValue = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {

  }

  ngAfterViewInit() {
    this.autocomplete = places({
      appId: 'plQNWZU0Q6KP',
      apiKey: '32bfe452706d74878d3117e163983a8c',
      container: this.el.nativeElement
    });

    this.autocomplete.on('change', e => {
      if (e.suggestion) {
        this.innerValue.lat = e.suggestion.latlng.lat;
        this.innerValue.lng = e.suggestion.latlng.lng;
        this.innerValue.address = e.suggestion.value;
        this.onChange(this.innerValue);
        this.addMarker();
      }
    });

    this.map = leaflet.map(this.mapEl.nativeElement);
    if (this.innerValue.lat) {
      this.addMarker();
    } else {
      this.map.setView([48.864716, 2.349014], 13);
    }
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

  }


  private addMarker() {
    const coord: [number, number] = [ this.innerValue.lat, this.innerValue.lng ];
    leaflet.marker(coord).addTo(this.map);
    this.map.setView(coord, 13);
  }

}
