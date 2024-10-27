import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsComponent } from './maps.component';
import { MapsLoaderService } from './services/maps-loader.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;
  let maspLoaderService: jasmine.SpyObj<MapsLoaderService>;

  beforeEach(async () => {

    maspLoaderService = jasmine.createSpyObj<MapsLoaderService>('MapsLoaderService', ['load']);

    await TestBed.configureTestingModule({
      imports: [MapsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MapsLoaderService, useValue: maspLoaderService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
