import { Circle } from '@mui/icons-material'
import { Color, MoveType } from 'utils/types'

export default function MoveTypeItem({ move }: { move: MoveType }) {
  const colorMap = {
    completed: Color.green,
    drop: Color.red,
    reroll: Color.blue,
    movie: Color.purple,
    sheikh: Color.orange,
  }
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Circle
        sx={{
          color: colorMap[move],
          width: '9px',
          height: '9px',
          marginRight: '5px',
        }}
      />
      {formatMoveType(move)}
    </span>
  )
}

function formatMoveType(move: MoveType) {
  switch (move) {
    case 'completed':
      return 'Пройдено'
    case 'drop':
      return 'Дроп'
    case 'reroll':
      return 'Реролл'
    case 'movie':
      return 'Фильм'
    case 'sheikh':
      return 'Шейх-момент'
  }
  return ''
}
