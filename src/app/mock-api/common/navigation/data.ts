/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'inicio',
        title: 'INICIO',
        type : 'basic',
        icon : 'home',
        link : '/trafico/Inicio'
    },
    // {
    //     id   : 'catalogos',
    //     title: 'CATALOGOS OPERACIONES',
    //     type : 'collapsable',
    //     icon : 'import_contacts',
    //     children: [
    //         {
    //             id       : 'casetas',
    //             title    : 'CASETAS',
    //             type     : 'basic',
    //             link     : '/catalogos/Casetas'
    //         }
    //     ]
    // },
    {
        id   : 'trafico',
        title: 'TRAFICO',
        type : 'collapsable',
        icon : 'compare_arrows',
        children: [
            {
                id       : 'conciliacionCasetas',
                title    : 'CONCILIACIÓN CASETA',
                type     : 'basic',
                link     : '/trafico/ConciliacionCaseta'
            },
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
