import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import HomeIcon from '@mui/icons-material/Home'
import EuroIcon from '@mui/icons-material/Euro'
import TodayIcon from '@mui/icons-material/Today'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AssessmentIcon from '@mui/icons-material/Assessment'

export const mainNavbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: 'Home',
    route: 'home',
    isLogged: true,
  },
  {
    id: 1,
    icon: <AssignmentIndIcon />,
    label: 'Patients',
    route: 'clients',
    isLogged: true,
  },
  {
    id: 2,
    icon: <TodayIcon />,
    label: 'Rendez-vous',
    route: 'sessions',
    isLogged: true,
  },
  {
    id: 3,
    icon: <EuroIcon />,
    label: 'Paiements',
    route: 'payments',
    isLogged: true,
  },
  {
    id: 4,
    icon: <ShoppingCartIcon />,
    label: 'Commandes',
    route: 'orders',
    isLogged: true,
  },
  {
    id: 5,
    icon: <ArticleIcon />,
    label: 'Articles',
    route: 'articles',
    isLogged: true,
  },
  {
    id: 6,
    icon: <AssessmentIcon />,
    label: 'Rapports',
    route: 'reports',
    isLogged: true,
  },
]
