import { AfterViewInit, Component, computed, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { KeystoreService } from '../kestore/services/keystore.service';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MapsLoaderService } from './services/maps-loader.service';
import { MapsPoint } from './model/MapsPoint';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as polyline from '@mapbox/polyline';

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

  readonly _polylineOptions = signal<google.maps.PolylineOptions | null>(null);
  polylineOptions = this._polylineOptions.asReadonly();

  readonly listPoints = input<MapsPoint[]>([]);
  readonly polylineEncode = input<string | null>(null);

  listPointPolilyne = signal<MapsPoint[]>([]);


  private googleMap: google.maps.Map | undefined;

  constructor(
    private readonly mapsLoaderService: MapsLoaderService,
    private readonly keystoreService: KeystoreService
  ) { }


  OnMapReady(map: google.maps.Map) {
    this.googleMap = map;
    this.updateMapCenterPoints();
    this.setupPolylineOptions();
    this.updatePolylinePoints();
  }


  async ngOnInit(): Promise<void> {
    try {
      const [_, mapId] = await Promise.all([
        this.mapsLoaderService.load(),
        this.keystoreService.getMapId()
      ]);
      this.setupOptions(mapId);
    } catch (error) {
      console.error(error);
    } finally {
      this._mapReady.set(true);
    }
  }

  private setupOptions(
    mapId: string,
  ): void {
    console.log('mapId', mapId);
    this._options.set({
      mapId: mapId,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: false,
      mapTypeControl: false,
    });
  }
  private decodePolyline(polylineEncode: string): MapsPoint[] {
    const points: MapsPoint[] = [];
    const coords = polyline.decode(polylineEncode);
    for (const [index, coord] of coords.entries()) {
      points.push({
        lat: coord[0],
        lng: coord[1],
        name: `Punto ${index + 1}`,
      });
    }
    return points;
  }

  private setupPolylineOptions(): void {

    const points = this.polylineEncode();

    if (!points) return;

    this.listPointPolilyne.set(this.decodePolyline(points));

    this._polylineOptions.set({
      path: this.listPointPolilyne(),
      strokeColor: '#00000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    new google.maps.Polyline(this._polylineOptions()).setMap(this.googleMap!);
  }


  updateMapCenterPoints(): void {
    const markerBounds = new google.maps.LatLngBounds();
    for (const point of this.listPoints()) {
      markerBounds.extend(point);
    }
    this.googleMap?.fitBounds(markerBounds);
  }

  updatePolylinePoints(): void {
    const markerBounds = new google.maps.LatLngBounds();
    for (const point of this.listPointPolilyne()) {
      markerBounds.extend(point);
    }
    this.googleMap?.fitBounds(markerBounds);
  }



}
