import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsInputComponent } from './options-input.component';
import { FormControl } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('OptionsInputComponent enable', () => {
  let component: OptionsInputComponent;
  let fixture: ComponentFixture<OptionsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsInputComponent],
      providers: [
        provideNoopAnimations(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsInputComponent);
    fixture.componentRef.setInput('control', new FormControl());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('OptionsInputComponent disable', () => {
  let component: OptionsInputComponent;
  let fixture: ComponentFixture<OptionsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsInputComponent],
      providers: [
        provideNoopAnimations(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsInputComponent);
    fixture.componentRef.setInput('isEnable', false);
    fixture.componentRef.setInput('control', new FormControl());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

