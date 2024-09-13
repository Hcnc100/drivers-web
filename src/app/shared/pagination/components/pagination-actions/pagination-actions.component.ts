import { Component, Input } from '@angular/core';
import { GeneralActions } from '../../model/pagination.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagination-actions',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './pagination-actions.component.html',
  styleUrl: './pagination-actions.component.css'
})
export class PaginationActionsComponent {
  @Input() generalActions?: GeneralActions[];
}
