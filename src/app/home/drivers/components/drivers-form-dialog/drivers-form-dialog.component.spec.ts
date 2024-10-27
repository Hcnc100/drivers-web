import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriversFormDialogComponent } from './drivers-form-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNoopAnimations } from '@angular/platform-browser/animations';



describe('EditFormDialogComponent', () => {
  let component: DriversFormDialogComponent;
  let fixture: ComponentFixture<DriversFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversFormDialogComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
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
