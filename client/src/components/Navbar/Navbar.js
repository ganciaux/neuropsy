import React from 'react'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { mainNavbarItems } from './consts/navbarItems'
import { useStyles } from './styles'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const classes = useStyles()

  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((item, index) => (
          <ListItem
            button
            key={item.id}
            onClick={() => navigate(item.route)}
            className={classes.listIcon}
          >
            <ListItemIcon className={classes.icons}>{item.icon}</ListItemIcon>
            <ListItemText className={classes.text} primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Navbar
