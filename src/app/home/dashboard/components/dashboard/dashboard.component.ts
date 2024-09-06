import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NavDestination, navDestinations } from '../../model/NavDestinations';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { ItemNavComponent } from "../item-nav/item-nav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    ToolbarComponent,
    MatIconModule,
    ItemNavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  listDestinations: NavDestination[] = navDestinations

  constructor() { }
}
