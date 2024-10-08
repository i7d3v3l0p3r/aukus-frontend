import { Box, Link } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import LinkSpan from 'components/LinkSpan'
import { useUser } from 'context/UserProvider'
import { Fragment, useState } from 'react'
import { updateVodLink } from 'utils/api'
import { PlayerMove, Color, Player, getPlayerColor } from 'utils/types'
import EditVodModal from './EditVodModal'

type Props = {
  id: number
  move: PlayerMove
  player?: Player
  colorType?: 'move_type' | 'player'
}

const moveTypeColor = {
  completed: Color.green,
  drop: Color.red,
  reroll: Color.blue,
  sheikh: Color.orange,
  movie: Color.purple,
}

const moveTypeText = {
  completed: 'Прошел',
  drop: 'Дроп',
  reroll: 'Реролл',
  sheikh: 'Шейх-момент',
  movie: 'Фильм',
}

export default function MoveCard({ id, move, player, colorType }: Props) {
  const [showVods, setShowVods] = useState(false)
  const [showVodsModal, setShowVodsModal] = useState(false)
  const currentUser = useUser()

  const canEdit =
    (currentUser?.role === 'player' &&
      currentUser?.user_id === move.player_id) ||
    (currentUser?.role === 'moder' && currentUser?.moder_for === move.player_id)

  const updateVod = useMutation({ mutationFn: updateVodLink })
  const queryClient = useQueryClient()

  const handleEditVods = () => {
    setShowVodsModal(true)
  }

  const handleModalClose = () => {
    setShowVodsModal(false)
  }

  const handleVodSave = (text: string) => {
    updateVod.mutate({ move_id: move.id, link: text })
    queryClient.invalidateQueries({ queryKey: ['playerMoves', move.player_id] })
    queryClient.invalidateQueries({ queryKey: ['todaysMoves'] })
    setShowVodsModal(false)
  }

  const greyColor = '#CECECE'
  let borderColor = greyColor
  if (player && colorType === 'player') {
    borderColor = getPlayerColor(player.url_handle)
  }
  if (colorType === 'move_type') {
    borderColor = moveTypeColor[move.type]
  }

  let moveTitle = `Ход — ${id}`
  if (player) {
    moveTitle = player.name
  }

  return (
    <>
      <Box marginBottom={'30px'} display={'flex'} justifyContent={'center'}>
        <Box
          borderRadius={'15px'}
          border={`2px solid ${borderColor}`}
          width={'800px'}
          textAlign={'left'}
          padding={'15px'}
          lineHeight={1}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            fontSize={'14px'}
            fontWeight={400}
            marginBottom={'15px'}
          >
            <Box color={player ? getPlayerColor(player.url_handle) : greyColor}>
              {moveTitle}
            </Box>
            <Box color={greyColor}>{formatDate(move.created_at)}</Box>
          </Box>
          <Box
            fontSize={'14px'}
            fontWeight={500}
            style={{ backgroundColor: moveTypeColor[move.type] }}
            width={'fit-content'}
            paddingTop={'5px'}
            paddingBottom={'5px'}
            paddingLeft={'12px'}
            paddingRight={'12px'}
            borderRadius={'5px'}
            marginBottom={'15px'}
          >
            {moveTypeText[move.type]}
          </Box>
          <Box fontSize={'24px'} marginBottom={'10px'}>
            {move.item_title}
          </Box>
          <Box
            fontSize={'14px'}
            fontWeight={400}
            marginBottom={'20px'}
            color={greyColor}
          >
            Ролл кубика — {move.dice_roll}, позиция на карте — {move.cell_to}
          </Box>
          <Box
            fontSize={'16px'}
            fontWeight={400}
            marginBottom={'25px'}
            lineHeight={1.2}
          >
            {move.item_rating}/10 — {move.item_review}
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            fontWeight={400}
          >
            <LinkSpan
              color={Color.blue}
              defaultColor={greyColor}
              onClick={() => setShowVods(!showVods)}
            >
              Показать записи стримов
            </LinkSpan>
            {canEdit && (
              <LinkSpan
                color={Color.blue}
                defaultColor={greyColor}
                style={{ marginLeft: '15px' }}
                onClick={handleEditVods}
              >
                Редактировать записи стримов
              </LinkSpan>
            )}
          </Box>
          {showVods && (
            <Box marginTop={'15px'} lineHeight={1.4} fontWeight={400}>
              {move.vod_link
                ? processText(move.vod_link)
                : 'Записи стримов еще не добавлены'}
            </Box>
          )}
        </Box>
      </Box>
      <EditVodModal
        open={showVodsModal}
        title={move.item_title}
        onClose={handleModalClose}
        onSave={handleVodSave}
        vodText={move.vod_link}
      />
    </>
  )
}

export function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString)

  // Extract the day, month, and year
  const day = date.getDate()
  const month = date.toLocaleString('ru-RU', { month: 'long' })
  const monthFixed = month.slice(0, -1) + 'я'

  const hour = date.getHours()
  const paddedHour = hour.toString().padStart(2, '0')
  const minute = date.getMinutes()
  const paddedMinute = minute.toString().padStart(2, '0')
  return `${day} ${monthFixed} ${paddedHour}:${paddedMinute}`
}

// Function to make URLs clickable and preserve line breaks
const processText = (text: string) => {
  // Regex to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g

  // Split by new lines and process each line
  return text.split('\n').map((line: string, index: number) => {
    // Split by URLs within the line
    const parts = line.split(urlRegex)

    // Render each part
    return (
      <Fragment key={index}>
        {parts.map((part, i) => {
          // If part matches the URL regex, render it as a link
          if (urlRegex.test(part)) {
            return (
              <Link
                href={part}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkSpan color={Color.blue}>{part}</LinkSpan>
              </Link>
            )
          }
          // Otherwise, render it as text
          return <span key={i}>{part}</span>
        })}
        <br />
      </Fragment>
    )
  })
}
