import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import DiceBox from '@3d-dice/dice-box'
import { DiceOption } from 'utils/types'

type Props = {
  open: boolean
  dice: DiceOption | null
  onTurnFinish: (diceRoll: number) => void
  onClose: () => void
}

const DiceBoxContainerId = 'dice-box'
const DiceBoxContainer = '#dice-box'

type DiceRoll = {
  value: number
}

type DiceBoxType = {
  canvas: HTMLCanvasElement
  init: () => Promise<void>
  roll: (dice: string) => Promise<Array<DiceRoll>>
  clear: () => void
}

export default function DiceModal({
  open,
  dice,
  onTurnFinish,
  onClose,
}: Props) {
  const [diceRoll, setDiceRoll] = useState<Array<number> | null>(null)
  const [diceStatus, setDiceStatus] = useState<
    'idle' | 'rolling' | 'done' | 'clear'
  >('idle')

  const [diceBox, setDiceBox] = useState<DiceBoxType | null>(null)

  const isTurnComplete = diceRoll !== null && diceStatus === 'done'
  const diceRollSum = diceRoll
    ? diceRoll.reduce((acc, value) => acc + value, 0)
    : null

  useEffect(() => {
    if (!open) {
      setDiceRoll(null)
      setDiceStatus('idle')
      if (diceBox) {
        diceBox.clear()
      }
    }
  }, [open, diceBox])

  const handleFinishTurn = () => {
    if (!diceRollSum) {
      return
    }
    onTurnFinish(diceRollSum)
  }

  const containerRef = useCallback(
    (node: HTMLDivElement) => {
      if (
        node !== null &&
        (!diceBox || (open && !document.getElementById(diceBox.canvas.id)))
      ) {
        const diceBox = new DiceBox({
          assetPath: '/static/assets/',
          container: DiceBoxContainer,
          scale: 11,
          themeColor: getRandomHexColor(),
          // delay: 100,
        })
        diceBox.init().then(() => {
          setDiceBox(diceBox)
        })
      }
    },
    [diceBox, open]
  )

  const handleThrowDice = () => {
    if (diceStatus !== 'idle' || !dice || !diceBox) {
      return
    }

    setDiceStatus('rolling')
    diceBox.roll(dice).then((result: Array<DiceRoll>) => {
      setDiceRoll(result.map((diceRoll) => diceRoll.value))
      setDiceStatus('done')
    })
  }

  const handleClose = () => {
    onClose()
  }

  const canThrowDice = diceStatus === 'idle' && diceRoll === null
  const showAllDices = diceRoll !== null && diceRoll.length > 1

  return (
    <Dialog open={open} onClose={handleClose} fullWidth keepMounted>
      <DialogTitle>
        Бросок кубика {diceRollSum && `: ${diceRollSum}`}{' '}
        {showAllDices && `(${diceRoll})`}
      </DialogTitle>
      <DialogContent>
        <div
          id={DiceBoxContainerId}
          className={canThrowDice ? 'active' : ''}
          style={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            height: '200px',
            border: '1px solid grey',
            borderRadius: 5,
            padding: '5px',
            cursor: canThrowDice ? 'pointer' : 'default',
          }}
          ref={containerRef}
          onClick={handleThrowDice}
        >
          {canThrowDice && (
            <Box position={'absolute'} top={10}>
              Бросить кубик {dice}
              <div style={{ color: 'red' }}>ПЕРЕБРАСЫВАТЬ НЕЛЬЗЯ!</div>
            </Box>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          onClick={handleFinishTurn}
          disabled={!isTurnComplete}
          color="secondary"
          variant="contained"
        >
          Ходить
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function getRandomHexColor(): string {
  // Helper function to convert a number to a two-digit hex string
  const toHex = (n: number): string => n.toString(16).padStart(2, '0')

  // Generate random numbers for red, green, and blue components
  const r = Math.floor(Math.random() * 256) // Red component (0-255)
  const g = Math.floor(Math.random() * 256) // Green component (0-255)
  const b = Math.floor(Math.random() * 256) // Blue component (0-255)

  // Return the hexadecimal color code as a string
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
