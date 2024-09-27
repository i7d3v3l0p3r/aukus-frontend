import { Box } from '@mui/material'
import LinkSpan from 'components/LinkSpan'
import { PlayerMove, Color } from 'utils/types'

type Props = {
  id: number
  move: PlayerMove
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

export default function MoveCard({ id, move }: Props) {
  return (
    <Box marginBottom={'30px'} display={'flex'} justifyContent={'center'}>
      <Box
        borderRadius={'15px'}
        border={`2px solid ${Color.greyLight}`}
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
          <Box>Ход — {id}</Box>
          <Box>{formatDate(move.created_at)}</Box>
        </Box>
        <Box
          fontSize={'14px'}
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
          {move.item_title} {move.item_rating}/10
        </Box>
        <Box fontSize={'14px'} fontWeight={400} marginBottom={'20px'}>
          Ролл кубика — {move.dice_roll}, позиция на карте — {move.cell_to}
        </Box>
        <Box fontSize={'16px'} fontWeight={400} marginBottom={'25px'}>
          {move.item_review}
        </Box>
        <Box>
          <LinkSpan color={Color.blue}>Показать записи стримов</LinkSpan>
        </Box>
      </Box>
    </Box>
  )
}

function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString)

  // Extract the day, month, and year
  const day = date.getDate()
  const month = date.toLocaleString('ru-RU', { month: 'long' })
  const monthFixed = month.slice(0, -1) + 'я'
  return `${day} ${monthFixed}`
}
