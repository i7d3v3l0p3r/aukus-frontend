import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { useState } from 'react'
import DifficultyWheel from './DifficultyWheel'
import WheelIcon from 'assets/icons/wheel.svg?react'

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
        <DialogContent style={{ overflow: 'hidden' }} onScroll={resetScroll}>
          <DifficultyWheel />
        </DialogContent>
        <DialogActions>
          <Box display={'flex'} justifyContent={'center'} width={'100%'}>
            <Button onClick={() => setModalOpen(false)}>Закрыть</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  )
}
