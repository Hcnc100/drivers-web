import { inject, Injectable } from '@angular/core';
import { KeystoreService } from '../../kestore/services/keystore.service';

@Injectable({
  providedIn: 'root'
})
export class MapsLoaderService {

  private promise?: Promise<any>;

  constructor(
    private readonly keystoreService: KeystoreService
  ) { }

  public async load() {
    const apiKey = await this.keystoreService.getMapsKey();
    const url = `http://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__onGoogleLoaded`;

    // First time 'load' is called?
    if (!this.promise) {

      // Make promise to load
      this.promise = new Promise(resolve => {

        // Set callback for when google maps is loaded.
        (window as any)['__onGoogleLoaded'] = () => {
          resolve('google maps api loaded');
        };

        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
      });
    }

    // Always return promise. When 'load' is called many times, the promise is already resolved.
    return this.promise;
  }
}
