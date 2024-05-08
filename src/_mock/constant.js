import SvgColor from '../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
export const userMenu = [
  {
    title: 'Home',
    path: '/',
    icon: icon('ic_user'),
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: icon('ic_user'),
  },
  {
    title: 'Apply Doctor',
    path: '/apply-doctor',
    icon: icon('ic_user'),
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
  },
];

// admin menu
export const adminMenu = [
  {
    title: 'Home',
    path: '/',
    icon: icon('ic_user'),
  },

  {
    title: 'Doctors',
    path: '/admin/doctors',
    icon: icon('ic_user'),
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic_user'),
  },
];
