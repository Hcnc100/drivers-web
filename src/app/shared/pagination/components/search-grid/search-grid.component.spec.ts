import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { SearchGridComponent } from './search-grid.component';

describe('SearchGridComponent', () => {
  let component: SearchGridComponent;
  let fixture: ComponentFixture<SearchGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchGridComponent],
      providers: [
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set search when updateSearch is called', () => {
    spyOn(component['searchSubject'], 'next');
    const event = { target: { value: 'test' } } as unknown as Event;

    component.updateSearch(event);

    expect(component['searchSubject'].next).toHaveBeenCalledWith('test');
  });

  it('should set search to an empty string when clearSearch is called', () => {
    spyOn(component.search, 'set');

    component.clearSearch();

    expect(component.search.set).toHaveBeenCalledWith('');
  });

  it('should call search.set after debounce time in ngOnInit', fakeAsync(() => {
    spyOn(component.search, 'set');

    component['searchSubject'].next('debounced test');
    tick(1000);

    expect(component.search.set).toHaveBeenCalledWith('debounced test');
  }));

  it('should unsubscribe from searchSubject on ngOnDestroy', () => {
    spyOn(component['searchSubject'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['searchSubject'].unsubscribe).toHaveBeenCalled();
  });
});
