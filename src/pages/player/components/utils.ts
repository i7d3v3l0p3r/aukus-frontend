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
