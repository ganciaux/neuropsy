import EuroIcon from '@mui/icons-material/Euro'
import TodayIcon from '@mui/icons-material/Today'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export const navItems = [
  {
    id: 2,
    icon: <TodayIcon />,
    label: 'Rendez-vous',
    route: '/sessions/client',
  },
  {
    id: 3,
    icon: <EuroIcon />,
    label: 'Paiements',
    route: '/payments/client',
  },
  {
    id: 4,
    icon: <ShoppingCartIcon />,
    label: 'Commandes',
    route: '/orders/client',
  },
]
