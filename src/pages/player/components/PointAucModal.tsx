import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { Color } from 'utils/types'

type Props = {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

export default function PointAucModal({ open, onClose, onAccept }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        fontSize={'24px'}
        fontWeight={600}
        style={{
          paddingTop: '30px',
          paddingLeft: '30px',
          lineHeight: '1',
          paddingBottom: '30px',
          paddingRight: '30px',
          backgroundColor: Color.blue,
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          Прежде чем привязать поинтаук, скройте свой экран на стриме
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              marginLeft: '30px',
              padding: 0,
              color: 'white',
            }}
          >
            <Close sx={{ fontSize: '29px' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogActions
        style={{
          backgroundColor: Color.blue,
          paddingTop: '50px',
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingBottom: '30px',
        }}
      >
        <Button
          color="customWhite"
          style={{ color: 'black' }}
          fullWidth
          onClick={onAccept}
        >
          Перейти на поинтаук
        </Button>
      </DialogActions>
    </Dialog>
  )
}
