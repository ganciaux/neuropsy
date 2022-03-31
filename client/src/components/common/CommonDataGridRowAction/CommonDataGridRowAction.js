import { Link, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { CommonDialogDelete } from '../CommonDialogDelete/CommonDialogDelete'

const CommonDataGridRowAction = ({
  detailsHref,
  detailsLabel = 'Détails',
  editHref,
  editLabel = 'Modifier',
  deleteHref,
  deleteLabel = 'Supprimer',
  dialogTitle = 'Supprimer ?',
  dialogContent,
  id,
  data,
  setData,
}) => {
  return (
    <Stack direction="row" gap={1}>
      {detailsHref && (
        <Link href={detailsHref} underline="hover">
          <ListAltIcon size="small">{detailsLabel}</ListAltIcon>
        </Link>
      )}
      {editHref && (
        <Link href={editHref} underline="hover">
          <EditIcon size="small">{editLabel}</EditIcon>
        </Link>
      )}
      {deleteHref && (
        <CommonDialogDelete
          title={dialogTitle}
          content={dialogContent}
          path={deleteHref}
          deleteLabel={deleteLabel}
          id={id}
          data={data}
          setData={setData}
        />
      )}
    </Stack>
  )
}

export default CommonDataGridRowAction
