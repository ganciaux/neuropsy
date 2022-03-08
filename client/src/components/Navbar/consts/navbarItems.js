import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import HomeIcon from '@mui/icons-material/Home'
import EuroIcon from '@mui/icons-material/Euro'
import TodayIcon from '@mui/icons-material/Today'
import ArticleIcon from '@mui/icons-material/Article'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

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
    icon: <TodayIcon />,
    label: 'Rendez-vous',
    route: 'sessions',
  },
  {
    id: 3,
    icon: <EuroIcon />,
    label: 'Paiements',
    route: 'payments',
  },
  {
    id: 4,
    icon: <ShoppingCartIcon />,
    label: 'Commandes',
    route: 'orders',
  },
  {
    id: 5,
    icon: <ArticleIcon />,
    label: 'Articles',
    route: 'articles',
  },
]
