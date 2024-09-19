import { Box, Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { DiceOption, NextTurnParams, Player } from 'utils/types'
import DiceModal from './DiceModal'
import TurnModal from './TurnModal'

type Props = {
  handleNextTurn: (params: NextTurnParams) => void
  player: Player
}

export default function ActionButton({ handleNextTurn, player }: Props) {
  const [turnModalOpen, setTurnModalOpen] = useState(false)
  const [diceModalOpen, setDiceModalOpen] = useState(false)

  const [dice, setDice] = useState<DiceOption | null>(null)
  const [turnParams, setTurnParams] = useState<NextTurnParams | null>(null)

  const [buttonFixed, setButtonFixed] = useState(true)

  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Empty dependency array ensures the effect runs only on mount and unmount

  const buttonBoxRef = useRef<HTMLDivElement>(null)
  const mapBottom = document.getElementById('map-cell-0')

  if (buttonBoxRef.current && mapBottom) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // console.log(buttonBoxTop)
    // console.log('map bot', mapBottom.getBoundingClientRect().bottom)
    // console.log(
    //   'bot pos',
    //   window.innerHeight - mapBottom.getBoundingClientRect().bottom
    // )

    const makeFixed =
      window.innerHeight - mapBottom.getBoundingClientRect().bottom < 170

    // console.log('scroll', scrollPosition)
    // console.log(buttonFixed)
    // console.log(buttonBoxTop, threshold)

    if (!makeFixed && buttonFixed) {
      setButtonFixed(false)
    }

    if (makeFixed && !buttonFixed) {
      setButtonFixed(true)
    }
  }

  const handleClick = () => {
    setTurnModalOpen(true)
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
    setDiceModalOpen(false)
    if (!turnParams) {
      return
    }
    if (turnParams.type === 'drop' || turnParams.type === 'sheikh') {
      turnParams.diceRoll = -roll
    } else {
      turnParams.diceRoll = roll
    }
    handleNextTurn(turnParams)
  }

  return (
    <>
      <Box display={'flex'} justifyContent="center">
        <Box
          sx={{
            position: buttonFixed ? 'fixed' : 'absolute',
            zIndex: 20,
            width: '320px',
            ...(buttonFixed ? { bottom: 100 } : { marginTop: '30px' }),
          }}
          ref={buttonBoxRef}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClick}
            fullWidth
          >
            <strong>Бросить кубик</strong>
          </Button>
        </Box>
      </Box>
      <TurnModal
        open={turnModalOpen}
        onClose={() => setTurnModalOpen(false)}
        onConfirm={handleConfirm}
        player={player}
      />
      <DiceModal
        open={diceModalOpen}
        dice={dice}
        onClose={() => setDiceModalOpen(false)}
        onTurnFinish={handleTurnFinish}
      />
    </>
  )
}
