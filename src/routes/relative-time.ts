function format(value: number, unit: Intl.RelativeTimeFormatUnit) {
  return new Intl.RelativeTimeFormat().format(-value, unit)
}

export function toRelativeTime(other: Date) {
  let dist = Math.abs(other.valueOf() - Date.now())

  dist = Math.floor(dist / 1000)
  if (dist < 60) {
    return format(dist, "seconds")
  }

  dist = Math.floor(dist / 60)
  if (dist < 60) {
    return format(dist, "minutes")
  }

  dist = Math.floor(dist / 60)
  if (dist < 24) {
    return format(dist, "hours")
  }

  dist = Math.floor(dist / 24)
  if (dist < 7) {
    return format(dist, "days")
  }

  if (dist < 28) {
    return format(Math.floor(dist / 7), "weeks")
  }

  if (Math.floor(dist / 30) < 12) {
    return format(Math.floor(dist / 30), "months")
  }

  return format(Math.floor(dist / 365), "months")
}
