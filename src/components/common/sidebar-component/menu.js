import {
    Home,
    UserPlus,
    Users,
    File,
     Layers,
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Forside', icon: Home, type: 'link', path: '/forside', badgeType: 'primary', active: false
    },
    
    {
        title: 'Profil', icon: Users, type: 'link', path: '/profil', active: false
    },
    
    {
        title: 'Sponsorer', icon: UserPlus, type: 'sub',  active: false, children: [
            {path: '/sponsorer/vores-sponsorer', type: 'link', title: 'Vores Sponsorer'},
            {path: '/sponsorer/sponsorater', type: 'link', title: 'Sponsorater'},
            {path: '/sponsorer/soeg-sponsor', type: 'link', title: 'Søg sponsorer'},
            {path: '/sponsorer/opret-sponsorat', type: 'link', title: 'Opret sponsorat'},
        ]
    },

    {
        title: 'Kurser', icon: Layers, type: 'sub', active: false, children: [
            { path: '/kursus/kursus-samling', title: 'Kursus samling', type: 'link' },
            { path: '/kursus/kursus-detaljer', title: 'Kursus information', type: 'link' },
        ]
    },
    
    {
        path: '/feedback/feedbackpage', title: 'Feedback', icon: File, type: 'link', active: false
    },
    
    
]
