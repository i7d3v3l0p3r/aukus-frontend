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

const itemReviews: Array<string> = [
  'ПРОЙДЕНО: ИГРУШКА-ПРИКОЛЮХА, ЖАЛЬ ПРИШЛОСЬ РАШИТЬ ',
  'Фильм «Вася не в себе» (2023). Добрая комедия про важность таджиков с Павлом Прилучным. 5/10 ))) ',
  'ПРОЙДЕНО: игру бы оценил нормально, если бы не мегауебищная камера, которая руинит весь экспириенс от прохождения 4/10',
  'Супер-дупер игра, музыка кайф, геймплей тоже. Да и сюжет если вчухаться приятный. 10/10 (пройдено за 5 часов)',
  'Клевая игра. Думал, что будет говно блевотное, но разнообразие геймплея и чувственный сюжет не позволяют поставить этой штуке меньше 8 баллов. 8/10',
  'Клевая игрушенция, думал что будет душно, а оказалось прикольно. Надо пройти все предыдущие части 7.5/10',
  'Неплохая задумка, хорошие зарисовки, российские разрабы. 7/10',
  '10 часов однообразных гонок. В игре минимальный набор гоночной игры, сюжета кот наплакал, миссии начинаются с нихуя (простите меня за мой французский), просто в рандомном месте на карте активируются. При этом до них можно даже не ездить а просто выбирать через мапу. 3/10',
  'Необычная головоломка с закадками внутри компьютера макинтош, удивила пару раз интересныйми задачами. 6/10',
  'Шедевральная игра, коих мало. 10/10 ',
]

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
      diceRoll = -sample([1, 2, 3, 4, 5, 6])
      currentPosition += diceRoll
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
      item_review: sample(itemReviews) as string,
      item_rating: sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
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
