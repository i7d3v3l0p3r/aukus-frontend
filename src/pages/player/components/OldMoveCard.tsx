import { Box } from '@mui/material'
import { Color } from 'utils/types'
import { PreviousGame } from '../data_aukus1'

type Props = {
  id: number
  game: PreviousGame
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

export default function OldMoveCard({ id, game }: Props) {
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
        </Box>
        <Box
          fontSize={'14px'}
          style={{ backgroundColor: moveTypeColor[game.status] }}
          width={'fit-content'}
          paddingTop={'5px'}
          paddingBottom={'5px'}
          paddingLeft={'12px'}
          paddingRight={'12px'}
          borderRadius={'5px'}
          marginBottom={'15px'}
        >
          {moveTypeText[game.status]}
        </Box>
        <Box fontSize={'24px'} marginBottom={'10px'}>
          {game.title}
        </Box>
        <Box
          fontSize={'16px'}
          fontWeight={400}
          marginBottom={'25px'}
          lineHeight={1.2}
        >
          {game.rating ? game.rating : '?/10'} — {game.review}
        </Box>
      </Box>
    </Box>
  )
}
