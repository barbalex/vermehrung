import { DateTime } from 'luxon'

export default ({ event }) => {
  const datumLabel = event.datum
    ? DateTime.fromSQL(event.datum).toFormat('yyyy.LL.dd')
    : '(kein Datum)'
  const geplant = event.geplant ? ' (geplant)' : ''
  const eventLabel = `${event?.beschreibung ?? '(nicht beschrieben)'}${geplant}`

  return `${datumLabel}: ${eventLabel}`
}
