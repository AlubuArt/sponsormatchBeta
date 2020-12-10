import {
    Home,
    UserPlus,
    Users,
    File,
     Layers,
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Forside', icon: Home, type: 'link', path: '/dashboard/default', badgeType: 'primary', active: false
    },
    
    {
        title: 'Profil', icon: Users, type: 'sub', active: false, children: [
            { path: '/users/userProfile', type: 'link', title: 'Klub profil' },
            { path: '/users/userEdit', type: 'link', title: 'Redigér profil' },
            
        ]
    },
    
    {
        title: 'Sponsorer', icon: UserPlus, type: 'sub',  active: false, children: [
            {path: '/sponsorer/vores-sponsorer', type: 'link', title: 'Vores Sponsorer'},
            {path: '/sponsorer/sponsorater', type: 'link', title: 'Sponsorater'},
            {path: '/sponsorer/soeg-sponsor', type: 'link', title: 'Søg sponsorer'}
        ]
    },

    {
        title: 'Kurser', icon: Layers, type: 'sub', active: false, children: [
            { path: '/kursus/kursus-samling', title: 'Kursus samling', type: 'link' },
            { path: '/kursus/kursus-detaljer', title: 'Kursus information', type: 'link' },
        ]
    },
    
    {
        path: '/sample/samplepage', title: 'Sample Page', icon: File, type: 'link', active: false
    },
    
    
]
