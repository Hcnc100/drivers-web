import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriversFormDialogComponent } from './drivers-form-dialog.component';


describe('EditFormDialogComponent', () => {
  let component: DriversFormDialogComponent;
  let fixture: ComponentFixture<DriversFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversFormDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DriversFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
