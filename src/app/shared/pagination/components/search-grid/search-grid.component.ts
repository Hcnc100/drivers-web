import { Component, model } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-grid',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule,
  ],
  templateUrl: './search-grid.component.html',
  styleUrl: './search-grid.component.css'
})
export class SearchGridComponent {

  search = model('');
} 
