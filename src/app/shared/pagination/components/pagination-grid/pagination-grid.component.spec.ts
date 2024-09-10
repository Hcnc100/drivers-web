import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationGridComponent } from './pagination-grid.component';

describe('PaginationGridComponent', () => {
  let component: PaginationGridComponent;
  let fixture: ComponentFixture<PaginationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
