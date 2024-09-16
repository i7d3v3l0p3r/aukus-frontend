import { Close, KeyboardArrowDownSharp } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useEffect, useState } from 'react'
import { fetchGameNames } from 'utils/api'

import {
  Color,
  DiceOption,
  MoveType,
  NextTurnParams,
  Player,
} from 'utils/types'
import NumRating from './NumRating'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: (params: NextTurnParams, dice: DiceOption) => void
  player: Player
}

export default function TurnModal({ open, onClose, onConfirm, player }: Props) {
  const [rating, setRating] = useState<number | null>(null)
  const [ratingHover, setRatingHover] = useState<number | null>(null)
  const [gameName, setGameName] = useState('')
  const [review, setReview] = useState('')
  const [gameHours, setGameHours] = useState<
    'short' | 'medium' | 'long' | null
  >(null)
  const [moveType, setMoveType] = useState<MoveType | null>(null)

  useEffect(() => {
    if (!open) {
      setRating(null)
      setRatingHover(null)
      setGameName('')
      setReview('')
      setGameHours(null)
      setMoveType(null)
    }
  }, [open])

  const {
    data: gameNamesData,
    dataUpdatedAt: updateTs,
    refetch,
    fetchStatus,
    status,
  } = useQuery({
    queryKey: ['game_names'],
    queryFn: () => fetchGameNames(gameName),
    enabled: gameName.length > 3,
  })

  useEffect(() => {
    if (
      status !== 'pending' &&
      fetchStatus === 'idle' &&
      gameName.length > 3 &&
      updateTs + 500 < Date.now()
    ) {
      refetch()
    }
  }, [gameName.length, status, fetchStatus, updateTs, refetch])

  let gameNameOptions: string[] = []
  if (gameName.length > 3 && gameNamesData) {
    gameNameOptions = gameNamesData.map((game) => game.gameName)
  }

  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRating(newValue)
  }

  const handleRatingChangeWhileHovering = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRatingHover(newValue)
  }

  const handleGameNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameName(event.target.value)
  }

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value)
  }

  const handleGameHoursChange = (
    newValue: 'short' | 'medium' | 'long' | null
  ) => {
    setGameHours(newValue)
  }

  const handleMoveTypeChange = (event: SelectChangeEvent) => {
    setMoveType(event.target.value as MoveType)
  }

  const dice: DiceOption | null = getDiceType({
    moveType,
    gameHours,
    playerPosition: player.map_position,
  })

  const gameFieldsCompleted = gameName && dice
  const reviewCompleted = review !== '' && rating !== null

  const canThrowDice = gameFieldsCompleted && reviewCompleted

  const handleConfirmTurn = () => {
    if (rating && moveType && dice !== null) {
      onConfirm(
        {
          type: moveType,
          itemLength: gameHours,
          itemRating: rating,
          itemReview: review,
          itemTitle: gameName,
          snakeFrom: null,
          snakeTo: null,
          stairFrom: null,
          stairTo: null,
          diceRoll: 0,
        },
        dice
      )
    }
  }

  const handleClose = () => {
    onClose()
  }

  let displayRating = rating || 0
  if (ratingHover && ratingHover !== -1) {
    displayRating = ratingHover
  }

  const canWatchMovie = player.map_position !== 101
  const readyToWin = player.map_position === 101 && moveType === 'completed'

  let buttonText = 'Перейти к броску'
  if (moveType === 'reroll') {
    buttonText = 'Рерольнуть игру'
  } else if (dice) {
    buttonText = `Перейти к броску ${dice}`
  }

  if (readyToWin) {
    buttonText = 'Победить в Аукусе 2024'
  }

  return (
    <Dialog open={open} onClose={() => {}} fullWidth keepMounted>
      <DialogTitle>
        Новый ход
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormControl size="small" fullWidth>
          {!moveType && (
            <InputLabel style={{ color: 'grey' }}>Действие</InputLabel>
          )}
          <Select
            onChange={handleMoveTypeChange}
            value={moveType ? moveType : ''}
            IconComponent={KeyboardArrowDownSharp}
          >
            <MenuItem value="completed">Прошел игру</MenuItem>
            <MenuItem value="drop">Дропнул игру</MenuItem>
            <MenuItem value="reroll">Реролл</MenuItem>
            <MenuItem value="sheikh">Шейх-момент</MenuItem>
            {canWatchMovie && (
              <MenuItem value="movie">Посмотрел фильм</MenuItem>
            )}
          </Select>
        </FormControl>

        <Box marginTop={2}>
          {moveType === 'movie' ? 'Фильм' : 'Игра'}
          <Autocomplete
            freeSolo
            options={gameNameOptions}
            value={gameName}
            onChange={(event, newValue) => {
              setGameName(newValue || '')
            }}
            renderInput={(params) => (
              <TextField
                onChange={(
                  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => setGameName(event.target.value)}
                {...params}
              />
            )}
          />
          <Input
            type="text"
            fullWidth
            value={gameName}
            onChange={handleGameNameChange}
            sx={{
              border: `2px solid ${Color.greyLight}`,
              padding: '4px',
              marginTop: 1,
              borderRadius: '10px',
              paddingLeft: '14px',
            }}
            disableUnderline
          />
        </Box>
        <Box marginTop={3}>
          {moveType === 'completed' && (
            <Box display="flex" justifyContent={'space-between'}>
              <Button
                onClick={() => handleGameHoursChange('short')}
                variant={gameHours === 'short' ? 'contained' : 'outlined'}
                color={gameHours === 'short' ? 'secondary' : 'info'}
                style={{ width: 200 }}
              >
                0-5 часов
              </Button>
              <Button
                onClick={() => handleGameHoursChange('medium')}
                variant={gameHours === 'medium' ? 'contained' : 'outlined'}
                color={gameHours === 'medium' ? 'secondary' : 'info'}
                style={{ marginLeft: 20, width: 200 }}
              >
                5-15 часов
              </Button>
              <Button
                onClick={() => handleGameHoursChange('long')}
                variant={gameHours === 'long' ? 'contained' : 'outlined'}
                color={gameHours === 'long' ? 'secondary' : 'info'}
                style={{ marginLeft: 20, width: 200 }}
              >
                15+ часов
              </Button>
            </Box>
          )}
        </Box>
        <Box marginTop={3} display="flex">
          <span style={{ width: '100px' }}>Оценка: {displayRating}</span>
          <NumRating
            precision={0.1}
            max={10}
            sx={{ marginLeft: 2 }}
            onChange={handleRatingChange}
            onChangeActive={handleRatingChangeWhileHovering}
            value={rating}
          />
        </Box>
        <Box marginTop={3}>
          Отзыв
          <TextField
            sx={{ marginTop: 1 }}
            InputProps={{
              style: {
                borderRadius: '10px',
                padding: '10px',
              },
            }}
            multiline
            fullWidth
            rows={4}
            value={review}
            onChange={handleReviewChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          onClick={handleConfirmTurn}
          disabled={!canThrowDice}
          color="secondary"
          variant="contained"
          sx={{
            margin: 2,
          }}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

type GetDiceTypeProps = {
  moveType: MoveType | null
  gameHours: 'short' | 'medium' | 'long' | null
  playerPosition: number
}

function getDiceType({
  moveType,
  gameHours,
  playerPosition,
}: GetDiceTypeProps) {
  if (!moveType) {
    return null
  }
  if (moveType === 'drop' || moveType === 'sheikh') {
    if (playerPosition >= 81) {
      return '2d6'
    }
    return '1d6'
  }
  if (moveType === 'completed' && gameHours) {
    if (playerPosition >= 81) {
      return '1d6'
    }
    switch (gameHours) {
      case 'short':
        return '1d6'
      case 'medium':
        return '2d6'
      case 'long':
        return '3d6'
    }
  }
  if (moveType === 'movie') {
    return '1d4'
  }
  if (moveType === 'reroll') {
    return 'skip'
  }
  return null
}
