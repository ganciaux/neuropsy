import PeopleIcon from '@mui/icons-material/People'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EuroIcon from '@mui/icons-material/Euro'
import ListAltIcon from '@mui/icons-material/ListAlt'

export const mainNavbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Home',
    route: '',
  },
  {
    id: 1,
    icon: <AssignmentIndIcon />,
    label: 'Patients',
    route: 'clients',
  },
  {
    id: 2,
    icon: <CalendarTodayIcon />,
    label: 'Rendez-vous',
    route: 'sessions',
  },
  {
    id: 3,
    icon: <EuroIcon />,
    label: 'Paiments',
    route: 'payments',
  },
  {
    id: 4,
    icon: <ListAltIcon />,
    label: 'Commandes',
    route: 'orders',
  },
]
