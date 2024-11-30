import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material'
import { useState } from 'react'
import DifficultyWheel from './DifficultyWheel'

export default function DifficultyButton() {
  const [modalOpen, setModalOpen] = useState(false)

  const resetScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    target.scrollTop = 0
  }

  return (
    <>
      <Box display="flex" justifyContent={'center'}>
        <Button onClick={() => setModalOpen(true)}>Колесо сложности</Button>
      </Box>
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
      >
        <DialogContent style={{ overflow: 'hidden' }} onScroll={resetScroll}>
          <DifficultyWheel />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
