import { range, sample } from 'lodash'
import { Player, PlayerMove } from './types'

const playerLasqa: Player = {
  id: 1,
  name: 'Lasqa',
  stream_link: 'https://live.vkplay.ru/lasqa',
  map_position: 0,
  current_game: 'Балдурс Гейт 3',
  is_online: false,
  url_handle: 'lasqa',
}

const playerSegall: Player = {
  id: 2,
  name: 'Segall',
  stream_link: 'https://www.twitch.tv/segall',
  map_position: sample(range(1, 99)) as number,
  current_game: 'Соник',
  is_online: true,
  url_handle: 'segall',
}

const playerRoadhouse: Player = {
  id: 3,
  name: 'Roadhouse',
  stream_link: 'https://www.twitch.tv/roadhouse',
  map_position: sample(range(1, 99)) as number,
  current_game: 'Готика',
  is_online: true,
  url_handle: 'roadhouse',
}

export const playersMock = [playerLasqa, playerSegall, playerRoadhouse].sort(
  (a, b) => {
    if (a.name > b.name) {
      return 1
    } else {
      return -1
    }
  }
)

export function playerMovesMock() {
  const dates = generateDateRange(
    new Date('2024-11-01'),
    new Date('2024-12-01')
  )
  const data: PlayerMove[] = []
  let currentPosition = 0
  const itemsAmount = 20
  for (let i = 0; i < itemsAmount; i++) {
    const status: PlayerMove['type'] = sample([
      'drop',
      'completed',
      'sheikh',
      'reroll',
      'movie',
    ])

    let diceRoll = 0
    if (status === 'drop' || status === 'sheikh') {
      diceRoll = sample([1, 2, 3, 4, 5, 6])
      currentPosition -= diceRoll
      if (currentPosition < 0) {
        currentPosition = 0
      }
    } else if (status === 'movie') {
      diceRoll = sample([1, 2, 3, 4])
      currentPosition += diceRoll
    } else if (status === 'reroll') {
    } else {
      diceRoll = sample([1, 2, 3, 4, 5, 6])
      currentPosition += diceRoll
    }

    data.push({
      created_at: dates[i].toDateString(),
      id: i + 1,
      item_title: sample(['Готика', 'Соник', 'Ведьмак', 'Смута']),
      type: status,
      dice_roll: diceRoll,
      cell_to: currentPosition,
      cell_from: currentPosition - diceRoll,
      item_review: sample(['норм', 'топ', 'ахуенно', 'лучшая игра']),
      item_rating: sample([1, 2, 3, 4, 5]),
      stair_from: null,
      stair_to: null,
      snake_from: null,
      snake_to: null,
      item_length: 'medium',
    })
  }
  return data
}

function generateDateRange(startDate: Date, endDate: Date) {
  // Create an array to store the dates
  const dateArray = []

  // Create a new Date object for the start date to avoid modifying the original startDate
  let currentDate = new Date(startDate)

  // Loop until the current date is greater than the end date
  while (currentDate <= endDate) {
    // Add the current date to the array
    dateArray.push(new Date(currentDate))

    // Increment the current date by one day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Return the array of dates
  return dateArray
}
