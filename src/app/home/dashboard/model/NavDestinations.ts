
export interface NavDestination {
    label: string;
    icon: string;
    route: string;
}


export const navDestinations: NavDestination[] = [
    {
        label: 'Drivers',
        icon: 'directions_car',
        route: 'drivers'
    },
    {
        label: 'Vehicles',
        icon: 'local_shipping',
        route: 'vehicles'
    },
    {
        label: 'Trips',
        icon: 'directions_bus',
        route: 'trips'
    }
];