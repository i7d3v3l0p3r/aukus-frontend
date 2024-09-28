import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material'
import { useState } from 'react'

type Props = {
  open: boolean
  title: string
  onClose: () => void
  onSave: (text: string) => void
}

export default function EditVodModal({ open, title, onClose, onSave }: Props) {
  const [vodValue, setVodValue] = useState('')

  const handleVodChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVodValue(e.target.value)
  }

  return (
    <Dialog open={open} fullWidth>
      <DialogTitle
        fontSize={'24px'}
        fontWeight={600}
        style={{
          paddingTop: '30px',
          paddingLeft: '30px',
          lineHeight: '1',
          paddingBottom: '30px',
          paddingRight: '30px',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          Записи для {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              padding: 0,
              color: 'white',
            }}
          >
            <Close sx={{ fontSize: '29px' }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        style={{
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingBottom: '30px',
        }}
      >
        <TextField
          InputProps={{
            style: {
              paddingTop: '10px',
              paddingLeft: '15px',
              paddingBottom: '10px',
              lineHeight: '1.2',
              fontSize: '16px',
            },
          }}
          multiline
          fullWidth
          rows={6}
          value={vodValue}
          onChange={handleVodChange}
        />
      </DialogContent>
      <DialogActions
        style={{
          paddingTop: 0,
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingBottom: '30px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onSave(vodValue)}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
