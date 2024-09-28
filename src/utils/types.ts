export type Player = {
  id: number
  name: string
  twitch_stream_link: string
  vk_stream_link: string
  donation_link: string
  is_online: boolean
  current_game: string
  url_handle: string
  map_position: number
  stream_last_category: string
}

export type PlayerStats = {
  id: number
  map_position: number
  total_moves: number
  games_completed: number
  games_dropped: number
  sheikh_moments: number
  rerolls: number
  movies: number
  ladders: number
  snakes: number
}

export type MoveType = 'completed' | 'drop' | 'sheikh' | 'reroll' | 'movie'

export type DiceOption = '1d6' | '2d6' | '3d6' | '1d8' | '1d4' | 'skip'

export type ItemLength = 'short' | 'medium' | 'long'

export type PlayerMove = {
  id: number
  created_at: string
  dice_roll: number
  cell_from: number
  cell_to: number
  stair_from: number | null
  stair_to: number | null
  snake_from: number | null
  snake_to: number | null
  type: MoveType
  item_title: string
  item_review: string
  item_rating: number
  item_length: ItemLength | null
}

export type PlayerMoveRequest = {
  player_id: number
  dice_roll: number
  move_to: number
  stair_from: number | null
  stair_to: number | null
  snake_from: number | null
  snake_to: number | null
  type: MoveType
  item_title: string
  item_review: string
  item_rating: number
  item_length: ItemLength | null
}

export type NextTurnParams = {
  diceRoll: number
  stairFrom: number | null
  stairTo: number | null
  snakeFrom: number | null
  snakeTo: number | null
  type: MoveType
  itemTitle: string
  itemReview: string
  itemRating: number
  itemLength: ItemLength | null
}

export type Page = 'map' | 'players' | 'player' | 'about' | 'rules' | 'stats'

export const Color = {
  greyLight: '#414141',
  greyDark: '#222222',
  red: '#ff3b30',
  green: '#34C759',
  greenLight: '#00B88C',
  purple: '#AF52DE',
  blue: '#007AFF',
  blueDark: '#5856D6',
  blueLight: '#32ADE6',
  brown: '#A2845E',
  orange: '#E58600',
  pink: '#FF2D55',
  pinkLight: '#ECA3D4',
}

type CustomColorNames = `custom${Capitalize<keyof typeof Color>}`

export type CustomColorOverrides = {
  [K in keyof typeof Color as CustomColorNames]: true
}

export const ColorByUrlHandle: { [key: string]: string } = {
  lasqa: Color.purple,
  segall: Color.blue,
  praden: Color.brown,
  artur: Color.red,
  uselessmouth: Color.pink,
  roadhouse: Color.orange,
  unclobjorn: Color.blueDark,
  melharucos: Color.blueLight,
  browjey: Color.greenLight,
  flashko: Color.green,
}

export const ColorNameByUrlHandle: {
  [key: string]: CustomColorNames
} = {
  lasqa: 'customPurple',
  segall: 'customBlue',
  praden: 'customBrown',
  artur: 'customRed',
  uselessmouth: 'customBlueDark',
  roadhouse: 'customOrange',
  unclobjorn: 'customBlueDark',
  melharucos: 'customBlueLight',
  browjey: 'customGreenLight',
  flashko: 'customGreen',
}

export function getPlayerColor(player: Player): string {
  return ColorByUrlHandle[player.url_handle] || Color.greyDark
}

export function getPlayerColorName(player: Player): CustomColorNames {
  return ColorNameByUrlHandle[player.url_handle] || 'customGreyDark'
}
