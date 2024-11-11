import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsInputComponent } from './options-input.component';

describe('OptionsInputComponent', () => {
  let component: OptionsInputComponent;
  let fixture: ComponentFixture<OptionsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
