import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-grid',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './pagination-grid.component.html',
  styleUrl: './pagination-grid.component.css'
})
export class PaginationGridComponent {

  @Input() data: any[] = [];

}
