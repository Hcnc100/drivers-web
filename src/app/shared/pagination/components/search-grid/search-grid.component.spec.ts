import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGridComponent } from './search-grid.component';

describe('SearchGridComponent', () => {
  let component: SearchGridComponent;
  let fixture: ComponentFixture<SearchGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
