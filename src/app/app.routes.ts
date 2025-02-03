import { Routes } from '@angular/router';
import { DriversComponent } from './home/drivers/drivers.component';
import { canActivateGuardHome } from './authentication/guard/home.guard';
import { VehiclesComponent } from './home/vehicles/vehicles.component';
import { TripsComponent } from './home/trips/trips.component';
import { ClientsComponent } from './home/clients/clients.component';
import { RequestComponent } from './home/request/request.component';
import { MapsComponent } from './shared/maps/maps.component';
import { canActivateGuardLogin } from './authentication/guard/login.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [canActivateGuardLogin],
        loadComponent: () => import('./authentication/login/login.component').then(m => m.LoginComponent),

    },
    {
        path: '',
        loadComponent: () => import('./home/dashboard/components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [canActivateGuardHome],
        loadChildren: () => homeRoutes,
    },
    {
        path: 'verify-account',
        loadComponent: () => import('./authentication/verify-account/verify-account.component').then(m => m.VerifyAccountComponent),
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