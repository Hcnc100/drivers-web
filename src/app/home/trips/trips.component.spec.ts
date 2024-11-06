import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TripsComponent } from './trips.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TripService } from './services/trip.service';
import { PaginatedResult } from '../../shared/pagination/model/pagination.result';
import { Trip } from './model/Trip';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

const paginationResult: PaginatedResult<Trip> = {
  pagination: {
    currentPage: 1,
    totalItems: 100,
    totalPages: 10,
    pageSize: 10
  },
  result: []
};

const trip: Trip = {
  id: "1",
  startAt: new Date(),
  endAt: null,
  tripState: "IN_PROGRESS",
  client: {
    id: 1,
    name: "Client Name"
  },
  driver: {
    id: 1,
    name: "Driver Name"
  },
};


describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;
  let tripsServiceSpy: jasmine.SpyObj<TripService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {

    tripsServiceSpy = jasmine.createSpyObj<TripService>('TripService', ['getAllPaginated']);
    matDialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [TripsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: TripService, useValue: tripsServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    })
      .compileComponents();

    tripsServiceSpy.getAllPaginated.and.returnValue(of(paginationResult));

    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call when click on visibility show trip dialog', () => {
    component.paginationActions[0].action({});
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it('should convert trip state to string', () => {
    expect(component.tripStateToString('ACTIVE')).toBe('En curso');
    expect(component.tripStateToString('FINISHED')).toBe('Finalizado');
    expect(component.tripStateToString('CANCELED')).toBe('Cancelado');
    expect(component.tripStateToString('unknown')).toBe('Desconocido');
  });

  it('should return "Sin fecha" when date is null or undefined', () => {
    expect(component.dateToString(undefined)).toBe('Sin fecha');
  });

  it('should return formatted date and time string when date is valid', () => {
    const date = new Date('2023-10-10T10:10:10');
    const expectedDateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    expect(component.dateToString(date)).toBe(expectedDateString);
  });


  it('should transform client name correctly', () => {
    const client = { name: 'John Doe' };
    const clientColumn = component.tripsColumns.find(col => col.key === 'client');
    expect(clientColumn!.transform!(client)).toBe('John Doe');
  });

  it('should transform driver name correctly', () => {
    const driver = { name: 'Jane Smith' };
    const driverColumn = component.tripsColumns.find(col => col.key === 'driver');
    expect(driverColumn!.transform!(driver)).toBe('Jane Smith');
  });

});
