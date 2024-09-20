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
    <span
      style={{
        border: `1px solid ${colorMap[move]}`,
        paddingTop: '3px',
        paddingBottom: '3px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
        fontSize: '13px',
      }}
    >
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
