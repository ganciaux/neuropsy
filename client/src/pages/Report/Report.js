import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import React from 'react'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import Avatar from '@mui/material/Avatar'
import FolderIcon from '@mui/icons-material/Folder'
import { Box } from '@mui/system'
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  )
}

const Report = () => {
  const isLoading = false
  const error = false

  if (isLoading) {
    return <CommonLoader />
  }

  if (error) {
    return <CommonLoaderAlert title="Error" alertContent="Error" />
  }

  return (
    <CommonPageHeader title="Report">
      <Box sx={{ flexGrow: 1, maxWidth: 752, border: '1px solid black' }}>
        <List>
          {generate(
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Single-line item xgsdr g awsergeèr hge hewhge ehehersh eerhesth  e hethjhe3 heh" />
            </ListItem>,
          )}
        </List>
      </Box>
    </CommonPageHeader>
  )
}

export default Report
