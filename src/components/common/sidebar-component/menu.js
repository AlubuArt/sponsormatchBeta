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
            {path: '/sponsorer/sponsorater', type: 'link', title: 'Sponsorater'}
        ]
    },

    {
        title: 'Kurser', icon: Layers, type: 'sub', active: false, children: [
            { path: '/learning/learning-list', title: 'Kursus samling', type: 'link' },
            { path: '/learning/learning-detail', title: 'Detail Course', type: 'link' },
        ]
    },
    
    {
        path: '/sample/samplepage', title: 'Sample Page', icon: File, type: 'link', active: false
    },
    
    
]
