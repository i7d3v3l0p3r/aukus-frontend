import { Box, Divider } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LinkSpan from 'components/LinkSpan'
import { useUser } from 'context/UserProvider'
import { useState } from 'react'
import { updateVodLink } from 'utils/api'
import { PlayerMove, Color, Player, getPlayerColor } from 'utils/types'
import EditVodModal from './EditVodModal'
import { formatDate, formatNumber } from './utils'
import TextRender from './TextRender'

type Props = {
  id: number
  move: PlayerMove
  player?: Player
  displayType?: 'map' | 'player'
  onSave?: () => void
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

export default function MoveCard({
  id,
  move,
  player,
  displayType,
  onSave,
}: Props) {
  const [showVods, setShowVods] = useState(false)
  const [showVodsModal, setShowVodsModal] = useState(false)
  const currentUser = useUser()

  let gameImage = move.item_image
  if (gameImage) {
    gameImage = gameImage.replace('{width}', '200').replace('{height}', '300')
  }

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

  const handleVodSave = (text: string, title: string) => {
    updateVod.mutate(
      { move_id: move.id, link: text, title },
      {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: ['playerMoves', move.player_id],
          })
          queryClient.invalidateQueries({ queryKey: ['todaysMoves'] })
        },
      }
    )
    onSave?.()
    setShowVodsModal(false)
  }

  const greyColor = '#CECECE'
  let playerColor = greyColor
  if (player && displayType === 'map') {
    playerColor = getPlayerColor(player.url_handle)
  }
  if (displayType === 'player') {
    playerColor = moveTypeColor[move.type]
  }

  let moveTitle = `Ход — ${id}`
  if (player && displayType === 'map') {
    moveTitle = player.name
  }

  return (
    <>
      <Box marginBottom={'30px'} display={'flex'} justifyContent={'center'}>
        <Box
          marginLeft={'10px'}
          marginRight={'10px'}
          borderRadius={'15px'}
          width={'800px'}
          textAlign={'left'}
          padding={'15px'}
          lineHeight={1}
          style={{
            backgroundColor: Color.greyDark,
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            fontSize={'14px'}
            fontWeight={500}
            marginBottom={'15px'}
          >
            <Box display={'flex'}>
              {displayType === 'map' && (
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{
                    borderLeftWidth: '2px',
                    borderRightWidth: '0px',
                    borderColor: playerColor,
                    borderRadius: '5px',
                    height: '13px',
                    marginRight: '5px',
                  }}
                />
              )}
              <Box color={greyColor}>{moveTitle}</Box>
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
          <Box display={'flex'}>
            {gameImage && (
              <Box marginRight={'15px'}>
                <img
                  src={gameImage}
                  width={'80px'}
                  style={{ borderRadius: '5px' }}
                />
              </Box>
            )}
            <Box>
              <Box fontSize={'24px'} marginBottom={'10px'}>
                {move.item_title}
              </Box>
              <Box
                fontSize={'13px'}
                fontWeight={400}
                marginBottom={'20px'}
                color={greyColor}
              >
                Ролл кубика:&nbsp;&nbsp;&nbsp;
                {formatNumber(move.dice_roll)}, позиция на
                карте:&nbsp;&nbsp;&nbsp;
                {move.cell_to}
              </Box>
              <Box fontSize={'16px'} fontWeight={400} lineHeight={1.2}>
                {move.item_rating}/10 — {move.item_review}
              </Box>
            </Box>
          </Box>
          {displayType === 'player' && (
            <Box
              marginTop={'25px'}
              display={'flex'}
              justifyContent={'space-between'}
              fontWeight={400}
            >
              <LinkSpan
                color={playerColor}
                defaultColor={greyColor}
                onClick={() => setShowVods(!showVods)}
              >
                Показать записи стримов
              </LinkSpan>
              {canEdit && (
                <LinkSpan
                  color={playerColor}
                  defaultColor={greyColor}
                  style={{ marginLeft: '15px' }}
                  onClick={handleEditVods}
                >
                  Редактировать
                </LinkSpan>
              )}
            </Box>
          )}
          {showVods && (
            <Box marginTop={'15px'} lineHeight={1.4} fontWeight={400}>
              {move.vod_link ? (
                <TextRender text={move.vod_link} borderColor={playerColor} />
              ) : (
                'Записи стримов еще не добавлены'
              )}
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
