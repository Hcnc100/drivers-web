import { AfterViewInit, Component, computed, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { KeystoreService } from '../kestore/services/keystore.service';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MapsLoaderService } from './services/maps-loader.service';
import { MapsPoint } from './model/MapsPoint';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    GoogleMapsModule
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {

  googleMap: google.maps.Map | undefined;

  private readonly mapId = '8ee2f2f9164580bc';

  private readonly _mapReady = signal(false);
  mapReady = this._mapReady.asReadonly();


  readonly options = signal<google.maps.MapOptions>(
    {
      center: { lat: 19.42847, lng: -99.12766 },
      zoom: 5,
      mapId: this.mapId
    }
  );

  listPoints = input.required<MapsPoint[]>();

  constructor(
    private readonly mapsLoaderService: MapsLoaderService
  ) { }


  OnMapReady($event: google.maps.Map) {
    this.googleMap = $event;
    this.updateMapCenter();
  }


  ngOnInit(): void {
    this.mapsLoaderService.load()
      .then(() => {
        this._mapReady.set(true);
      })
  }

  updateMapCenter(): void {
    const markerBounds = new google.maps.LatLngBounds();
    for (const point of this.listPoints()) {
      markerBounds.extend(point);
    }
    this.googleMap?.fitBounds(markerBounds);
  }


}
