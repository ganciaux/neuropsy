import { Link, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { CommonDialogDelete } from '../CommonDialogDelete/CommonDialogDelete'
import { printData } from '../../../api/api'

const CommonDataGridRowAction = ({
  detailsHref,
  detailsLabel = 'Détails',
  editHref,
  editLabel = 'Modifier',
  deleteHref,
  deleteLabel = 'Supprimer',
  printHref,
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
      {printHref && (
        <PictureAsPdfIcon
          sx={{ cursor: 'pointer' }}
          onClick={(e) => printData(printHref, id, 'filename.pdf')}
        />
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
