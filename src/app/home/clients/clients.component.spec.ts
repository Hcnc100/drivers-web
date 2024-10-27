import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { ClientsService } from './services/clients.service';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: ClientsService;

  beforeEach(async () => {

    clientService = jasmine.createSpyObj<ClientsService>('ClientsService', ['getAllPaginated', 'notifyChange']);

    await TestBed.configureTestingModule({
      imports: [ClientsComponent],
      providers: [{ provide: ClientsService, useValue: clientService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
