import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNavComponent } from './item-nav.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ItemNavComponent', () => {
  let component: ItemNavComponent;
  let fixture: ComponentFixture<ItemNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemNavComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Simula los parámetros de la ruta
            snapshot: {
              paramMap: {
                get: (key: string) => '123' // Simula el método get de paramMap
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ItemNavComponent);
    component = fixture.componentInstance;
    component.navDestination = {
      icon: 'icon',
      route: 'route',
      label: 'label'
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
