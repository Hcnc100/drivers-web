import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { KeyResponse } from '../models/key.response';

@Injectable({
  providedIn: 'root'
})
export class KeystoreService {

  private readonly controller = environment.apiUrl + environment.apiVersion + '/keystore';
  private _mapsKey?: string;
  mapKey?: string = this._mapsKey;

  constructor(
    private readonly http: HttpClient,
  ) { }

  async getMapsKey() {

    if (this._mapsKey) {
      return this._mapsKey;
    }
    try {
      const key = await firstValueFrom(this.http.get<KeyResponse>(`${this.controller}/maps`));
      this._mapsKey = key.key;
      return this._mapsKey;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
