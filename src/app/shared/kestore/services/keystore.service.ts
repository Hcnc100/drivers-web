import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { KeyResponse } from '../models/key.response';

@Injectable({
  providedIn: 'root'
})
export class KeystoreService {
  readonly http = inject(HttpClient);

  private readonly controller = environment.apiUrl + environment.apiVersion + '/keystore';

  private _mapsKey?: string;
  private _mapId?: string;


  async getMapsKey() {

    if (this._mapsKey) return this._mapsKey;

    try {
      const key = await firstValueFrom(this.http.get<KeyResponse>(`${this.controller}/maps`));
      this._mapsKey = key.key;
      return this._mapsKey;
    } catch (error) {
      throw error;
    }
  }

  async getMapId() {
    if (this._mapId) return this._mapId;

    try {
      const key = await firstValueFrom(this.http.get<KeyResponse>(`${this.controller}/mapId`));
      this._mapId = key.key;
      return this._mapId;
    } catch (error) {
      throw error;
    }
  }

}
