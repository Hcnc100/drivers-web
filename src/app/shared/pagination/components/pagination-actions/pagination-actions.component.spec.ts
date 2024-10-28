import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationActionsComponent } from './pagination-actions.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('PaginationActionsComponent', () => {
  let component: PaginationActionsComponent;
  let fixture: ComponentFixture<PaginationActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationActionsComponent],
      providers: [
        provideNoopAnimations(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
