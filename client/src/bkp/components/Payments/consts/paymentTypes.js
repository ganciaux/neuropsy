import ArticleIcon from '@mui/icons-material/Article'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import EuroIcon from '@mui/icons-material/Euro'

export const paymentTypes = [
  {
    id: 0,
    value: 0,
    icon: <EuroIcon />,
    label: 'Liquide',
  },
  {
    id: 1,
    value: 1,
    icon: <ArticleIcon />,
    label: 'Chèque',
  },
  {
    id: 2,
    value: 2,
    icon: <AccountBalanceIcon />,
    label: 'Virement',
  },
  {
    id: 3,
    value: 3,
    icon: <CreditCardIcon />,
    label: 'Carte bleu',
  },
]
