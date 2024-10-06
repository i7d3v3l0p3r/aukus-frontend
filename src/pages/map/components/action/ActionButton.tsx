import { Button } from '@mui/material'
import { useState } from 'react'
import { DiceOption, NextTurnParams, Player } from 'utils/types'
import DiceModal from './DiceModal'
import TurnModal from './TurnModal'

type Props = {
  handleNextTurn: (params: NextTurnParams) => void
  player: Player
  onMakingTurn: (open: boolean) => void
  onDiceRoll: (params: NextTurnParams) => void
}

export default function ActionButton({
  handleNextTurn,
  player,
  onMakingTurn,
  onDiceRoll,
}: Props) {
  const [turnModalOpen, setTurnModalOpen] = useState(false)
  const [diceModalOpen, setDiceModalOpen] = useState(false)

  const [dice, setDice] = useState<DiceOption | null>(null)
  const [turnParams, setTurnParams] = useState<NextTurnParams | null>(null)

  const handleClick = () => {
    setTurnModalOpen(true)
    onMakingTurn(true)
  }

  const handleClose = () => {
    setTurnModalOpen(false)
    onMakingTurn(false)
  }

  const handleConfirm = (params: NextTurnParams, dice: DiceOption) => {
    setTurnParams(params)
    setDice(dice)
    setTurnModalOpen(false)

    if (params.type === 'completed' && player.map_position === 101) {
      handleNextTurn(params)
      return
    }

    if (dice === 'skip') {
      handleNextTurn(params)
    } else {
      setDiceModalOpen(true)
    }
  }

  const handleTurnFinish = (roll: number) => {
    if (!turnParams) {
      return
    }
    setDiceModalOpen(false)
    handleNextTurn(turnParams)
  }

  const handleDiceRoll = (roll: number) => {
    if (!turnParams) {
      return
    }
    if (turnParams.type === 'drop' || turnParams.type === 'sheikh') {
      turnParams.diceRoll = -roll
    } else {
      turnParams.diceRoll = roll
    }
    setTurnParams({ ...turnParams })
    onDiceRoll(turnParams)
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClick}
        sx={{ width: '320px' }}
      >
        <strong>Бросить кубик</strong>
      </Button>
      <TurnModal
        open={turnModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        player={player}
      />
      <DiceModal
        open={diceModalOpen}
        dice={dice}
        onTurnFinish={handleTurnFinish}
        onDiceRoll={handleDiceRoll}
      />
    </>
  )
}
