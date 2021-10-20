import {
    Home,
    UserPlus,
    Users,
     Layers,
     Archive,
     Edit
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Dashboard', icon: Home, type: 'link', path: '/forside', badgeType: 'primary', active: false
    },
    {
        title: 'Sponsorater', icon: Archive, type: 'link', path: '/sponsorater', active: false
    },
    {
        title: 'Opret Sponsorat', icon: Edit, type: 'link', path: '/opret-sponsorat', active: false
    },
    {
        title: 'Søg Sponsorer', icon: UserPlus, type: 'link', path: '/soeg-sponsor', active: false
    },
    {
        title: 'Se SponsorMatches', icon: UserPlus, type: 'link', path: '/sponsor-matches', active: false

    },  
    
    {
        title: 'Vores Sponsorer', icon: Users, type: 'link', path: '/vores-sponsorer', active: false
    },
    {
        title: 'Kurser', icon: Layers, type: 'link', path: '/kursus-samling', active: false
    } 
]
