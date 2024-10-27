import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TripsComponent } from './trips.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
