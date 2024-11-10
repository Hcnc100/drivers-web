import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputComponent } from './custom-input.component';
import { FormControl } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomInputComponent],
      providers: [
        provideNoopAnimations(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomInputComponent);
    fixture.componentRef.setInput('control', new FormControl());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with isEnable true', () => {
    fixture.componentRef.setInput('isEnable', true);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with isEnable false', () => {
    fixture.componentRef.setInput('isEnable', false);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
