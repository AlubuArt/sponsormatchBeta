import {
    Home,
    Box,
    DollarSign,
    UserPlus,
    Users,
    Chrome,
    Settings,
    Airplay,
    FolderPlus,
    File,
    Command, Cloud, Book, FileText, Server, Image, Sliders, Map, GitPullRequest, Calendar, Edit, Mail, MessageSquare, UserCheck, Layers, HelpCircle, Database, Headphones, Mic, ShoppingBag, Search, AlertOctagon, Lock, Briefcase, BarChart,Target, List, Package
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Forside', icon: Home, type: 'link', path: '/dashboard/default', badgeType: 'primary', active: false
    },
    
    {
        title: 'Profil', icon: Users, type: 'sub', active: false, children: [
            { path: '/users/userProfile', type: 'link', title: 'Users Profile ' },
            { path: '/users/userEdit', type: 'link', title: 'Users Edit' },
            
        ]
    },
    
    {
        title: 'Sponsorer', icon: UserPlus, type: 'link', path: '/contact-app/contact', active: false
    },

    {
        title: 'Kurser', icon: Layers, type: 'sub', active: false, children: [
            { path: '/learning/learning-list', title: 'Learning List', type: 'link' },
            { path: '/learning/learning-detail', title: 'Detail Course', type: 'link' },
        ]
    },
    
    {
        path: '/sample/samplepage', title: 'Sample Page', icon: File, type: 'link', active: false
    },
    
    
]
