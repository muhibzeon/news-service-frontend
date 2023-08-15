import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'News',
    icon: 'icon-Bird',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/manage-news',
    title: 'Manage News',
    icon: 'icon-Files',
    class: '',
    extralink: false,
    submenu: []
  }
];
