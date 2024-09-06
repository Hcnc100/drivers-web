import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DriversComponent } from './home/drivers/drivers.component';
import { guardGuard } from './authentication/guard/guard.guard';
import { DashboardComponent } from './home/dashboard/components/dashboard/dashboard.component';
import { VehiclesComponent } from './home/vehicles/vehicles.component';
import { TripsComponent } from './home/trips/trips.component';

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
        path: '',
        redirectTo: 'drivers',
        pathMatch: 'full'
    }
]