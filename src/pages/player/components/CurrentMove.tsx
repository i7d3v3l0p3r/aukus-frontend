import { Box } from '@mui/material'
import LinkSpan from 'src/components/LinkSpan'
import { formatDate } from './utils'
import { useState } from 'react'
import EditCurrentGameModal from './EditCurrentGameModal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCurrentGame } from 'src/utils/api'
import { getPlayerColor, Player } from 'src/utils/types'

type CurrentMoveProps = {
  id: number
  title: string
  player: Player
  updatedAt: string
  canEdit: boolean
}

export default function CurrentMove({
  id,
  title,
  player,
  updatedAt,
  canEdit,
}: CurrentMoveProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const updateTitle = useMutation({ mutationFn: updateCurrentGame })

  const handleSave = (title: string) => {
    updateTitle.mutate({ player_id: player.id, title })
    queryClient.invalidateQueries({ queryKey: ['players'] })
    setModalOpen(false)
  }

  const playerColor = getPlayerColor(player.url_handle)

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} marginBottom={'50px'}>
        <Box
          borderRadius={'15px'}
          border={`2px solid ${playerColor}`}
          width={'800px'}
          textAlign={'left'}
          padding={'15px'}
          lineHeight={1}
          style={{
            backgroundColor: playerColor,
          }}
        >
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            fontSize={'14px'}
            fontWeight={400}
            marginBottom={'15px'}
          >
            <Box>Ход — {id}</Box>
            <Box>{formatDate(updatedAt)}</Box>
          </Box>
          <Box
            fontSize={'14px'}
            style={{ backgroundColor: 'white', color: 'black' }}
            width={'fit-content'}
            paddingTop={'5px'}
            paddingBottom={'5px'}
            paddingLeft={'12px'}
            paddingRight={'12px'}
            borderRadius={'5px'}
            marginBottom={'15px'}
          >
            Выпало на ауке
          </Box>
          <Box fontSize={'24px'}>{title}</Box>
          {canEdit && (
            <Box fontWeight={400} textAlign={'end'}>
              <LinkSpan onClick={() => setModalOpen(true)}>
                Редактировать
              </LinkSpan>
            </Box>
          )}
        </Box>
      </Box>
      <EditCurrentGameModal
        open={modalOpen}
        title={title}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}
