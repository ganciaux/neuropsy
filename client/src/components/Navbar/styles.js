import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',

      color: 'rgba(255, 255, 255, 0.9)',
      [theme.breakpoints.up('md')]: {},
      [theme.breakpoints.down('sm')]: {},
    },
    '& .Mui-selected': {
      color: 'red',
    },
    zIndex: '10',
  },
  icons: {
    color: '#428bca!important',
    [theme.breakpoints.down('sm')]: {
      minWidth: '20px!important',
    },
  },
  text: {
    '& span': {
      marginLeft: '-10px',
      fontWeight: '600',
      fontSize: '16px',
      color: '#428bca',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
}))
