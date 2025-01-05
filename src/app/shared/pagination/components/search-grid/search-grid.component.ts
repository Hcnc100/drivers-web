import { Component, model, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged, of, Subject } from 'rxjs';


@Component({
  selector: 'app-search-grid',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './search-grid.component.html',
  styleUrl: './search-grid.component.css'
})
export class SearchGridComponent implements OnInit, OnDestroy {

  private searchSubject = new Subject<string>();
  search = model('');


  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((search: string) => this.search.set(search));
  }


  clearSearch() {
    this.search.set('');
  }

  updateSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }

} 
