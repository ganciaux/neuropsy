import { makeStyles } from '@mui/styles'

export const tableStyle = makeStyles((theme) => ({
  headers: {
    backgroundColor: '#eee',
    '& .MuiTableCell-head': {
      fontWeight: '700!important',
    },
  },
}))
