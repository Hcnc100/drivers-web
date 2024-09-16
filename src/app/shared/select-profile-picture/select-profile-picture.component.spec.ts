import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfilePictureComponent } from './select-profile-picture.component';

describe('SelectProfilePictureComponent', () => {
  let component: SelectProfilePictureComponent;
  let fixture: ComponentFixture<SelectProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectProfilePictureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
