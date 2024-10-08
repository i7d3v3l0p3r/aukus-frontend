import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Input,
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useState } from 'react'
import { createPlayerMove } from 'utils/api'
import { Player } from 'utils/types'

type Props = {
  player: Player
  freezeDice: (value: number) => void
}

export default function TesterButton({ player, freezeDice }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [position, setPosition] = useState(player.map_position)
  const [diceRoll, setDiceRoll] = useState(1)

  useEffect(() => {
    setPosition(player.map_position)
  }, [player.map_position])

  const queryClient = useQueryClient()

  const handleMoveClick = async () => {
    await createPlayerMove({
      player_id: player.id,
      dice_roll: position - player.map_position,
      move_to: position,
      stair_from: null,
      stair_to: null,
      snake_from: null,
      snake_to: null,
      type: 'completed',
      item_title: 'Test move',
      item_rating: 0,
      item_review: '',
      item_length: 'short',
    })
    await queryClient.invalidateQueries()
    player.map_position = position
  }

  const handleDiceFreze = () => {
    freezeDice(diceRoll)
  }

  return (
    <Box>
      <Button
        style={{ width: '320px' }}
        color="error"
        onClick={() => setModalOpen(true)}
      >
        Для тестов
      </Button>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogContent>
          <Box>
            <Input
              type="number"
              placeholder="Позиция"
              value={position}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPosition(parseInt(event.target.value) || 0)
              }
            />
            <Button onClick={handleMoveClick}>Переместить</Button>
          </Box>
          <Box>
            <Input
              type="number"
              placeholder="Позиция"
              value={diceRoll}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setDiceRoll(parseInt(event.target.value) || 0)
              }
            />
            <Button onClick={handleDiceFreze}>Зафиксировать кубик</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
