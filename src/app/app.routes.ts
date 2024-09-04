import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DriversComponent } from './home/drivers/drivers.component';
import { guardGuard } from './authentication/guard/guard.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'drivers',
        component: DriversComponent,
        canActivate: [guardGuard]
    },
    {
        path: '**',
        redirectTo: 'drivers',
    }
];
