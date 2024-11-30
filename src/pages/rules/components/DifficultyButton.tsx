import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import DifficultyWheel from './DifficultyWheel'
import WheelIcon from 'assets/icons/wheel.svg?react'
import { Close } from '@mui/icons-material'

export default function DifficultyButton() {
  const [modalOpen, setModalOpen] = useState(false)

  const resetScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    target.scrollTop = 0
  }

  return (
    <>
      <Button
        sx={{ width: '207px', paddingLeft: '15px', paddingRight: '15px' }}
        onClick={() => setModalOpen(true)}
      >
        <WheelIcon
          style={{ marginRight: '8px', width: '19px', height: '19px' }}
        />
        Колесо сложности
      </Button>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
      >
        <DialogTitle style={{ padding: 0, margin: 0 }}>
          <Box
            width={'100%'}
            fontSize={'32px'}
            marginBottom={'0px'}
            display={'flex'}
            position={'relative'}
            marginTop={'20px'}
          >
            <Box margin={'0 auto'}>Ролл сложности игры</Box>
            <Box position={'absolute'} right={'40px'}>
              <IconButton
                aria-label="close"
                onClick={() => setModalOpen(false)}
                sx={{
                  padding: 0,
                  color: 'white',
                }}
              >
                <Close sx={{ fontSize: '29px' }} />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent style={{ overflow: 'hidden' }} onScroll={resetScroll}>
          <DifficultyWheel />
        </DialogContent>
      </Dialog>
    </>
  )
}
