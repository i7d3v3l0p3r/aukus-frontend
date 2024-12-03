import { CurrentUser } from 'src/utils/types'

export function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString)

  // Format the date and time in Moscow timezone
  const day = date.toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: 'numeric',
  })
  const month = date.toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    month: 'long',
  })
  const monthFixed = month.slice(0, -1) + 'я' // Adjust ending for Russian grammar

  const hourMinute = date.toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
  })

  return `${day} ${monthFixed} ${hourMinute} МСК`
}

export function formatNumber(i: number) {
  if (i < 0) {
    return `−${Math.abs(i)}`
  } else {
    return `${i}`
  }
}

export function hasEditPermission(
  user: CurrentUser | null,
  player_id?: number
) {
  if (user?.role === 'admin') {
    return true
  }
  if (!player_id || !user) {
    return false
  }
  if (user?.role === 'player' && user?.user_id === player_id) {
    return true
  }
  if (user?.role === 'moder' && user?.moder_for === player_id) {
    return true
  }
  return false
}
