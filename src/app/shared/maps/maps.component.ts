import { AfterViewInit, Component, computed, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { KeystoreService } from '../kestore/services/keystore.service';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MapsLoaderService } from './services/maps-loader.service';
import { MapsPoint } from './model/MapsPoint';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [
    GoogleMapsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {

  private readonly _mapReady = signal(false);
  mapReady = this._mapReady.asReadonly();

  private readonly _mapId = signal<string | null>(null);
  mapId = this._mapId.asReadonly();

  readonly _options = signal<google.maps.MapOptions | null>(null);
  options = this._options.asReadonly();

  listPoints = input.required<MapsPoint[]>();

  private googleMap: google.maps.Map | undefined;

  constructor(
    private readonly mapsLoaderService: MapsLoaderService,
    private readonly keystoreService: KeystoreService
  ) { }


  OnMapReady(map: google.maps.Map) {
    this.googleMap = map;
    this.updateMapCenter();
  }


  async ngOnInit(): Promise<void> {
    try {
      const [_, mapId] = await Promise.all([
        this.mapsLoaderService.load(),
        this.keystoreService.getMapId()
      ]);
      this._options.set({
        mapId: mapId,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this._mapReady.set(true);
    }
  }


  updateMapCenter(): void {
    const markerBounds = new google.maps.LatLngBounds();
    for (const point of this.listPoints()) {
      markerBounds.extend(point);
    }
    this.googleMap?.fitBounds(markerBounds);
  }


}
