
export function formatDate(dateString: string) {
  // Create a new Date object
  const date = new Date(dateString)

  // Extract the day, month, and year
  const day = date.getDate()
  const month = date.toLocaleString('ru-RU', { month: 'long' })
  const monthFixed = month.slice(0, -1) + 'я'

  const hour = date.getHours()
  const paddedHour = hour.toString().padStart(2, '0')
  const minute = date.getMinutes()
  const paddedMinute = minute.toString().padStart(2, '0')
  return `${day} ${monthFixed} ${paddedHour}:${paddedMinute}`
}

export function formatNumber(i: number) {
  if (i < 0) {
    return `−${Math.abs(i)}`
  } else {
    return `${i}`
  }
}
