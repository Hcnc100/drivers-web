import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DriversComponent } from './home/drivers/drivers.component';
import { guardGuard } from './authentication/guard/guard.guard';
import { DashboardComponent } from './home/dashboard/components/dashboard/dashboard.component';
import { VehiclesComponent } from './home/vehicles/vehicles.component';
import { TripsComponent } from './home/trips/trips.component';
import { ClientsComponent } from './home/clients/clients.component';
import { RequestComponent } from './home/request/request.component';
import { MapsComponent } from './shared/maps/maps.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./authentication/login/login.component').then(m => m.LoginComponent),

    },
    {
        path: '',
        loadComponent: () => import('./home/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [guardGuard],
        loadChildren: () => homeRoutes,
    },
    {
        path: '**',
        redirectTo: '',
    }
];



export const homeRoutes: Routes = [
    {
        path: 'drivers',
        component: DriversComponent,
    },
    {
        path: 'vehicles',
        component: VehiclesComponent,
    },
    {
        path: 'trips',
        component: TripsComponent,
    },
    {
        path: 'clients',
        component: ClientsComponent,
    },
    {
        path: 'requests',
        component: RequestComponent,
    },
    {
        path: 'maps',
        component: MapsComponent,
    },
    {
        path: '',
        redirectTo: 'drivers',
        pathMatch: 'full'
    }
]