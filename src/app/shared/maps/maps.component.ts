import { Component, inject, OnInit } from '@angular/core';
import { KeystoreService } from '../kestore/services/keystore.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapsLoaderService } from './services/maps-loader.service';

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

  public mapReady = false;


  readonly options: google.maps.MapOptions = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  }

  constructor(
    private readonly mapsLoaderService: MapsLoaderService
  ) { }

  ngOnInit(): void {
    this.mapsLoaderService.load()
      .then(() => {
        this.mapReady = true;
      })
  }


}
