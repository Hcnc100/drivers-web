import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NavDestination } from '../../model/NavDestinations';

@Component({
  selector: 'app-item-nav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule
  ],
  templateUrl: './item-nav.component.html',
  styleUrl: './item-nav.component.css'
})
export class ItemNavComponent {

  @Input({
    required: true
  }) navDestination!: NavDestination;
}
