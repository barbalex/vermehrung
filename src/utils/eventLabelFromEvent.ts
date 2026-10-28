import { DateTime } from 'luxon'

export const eventLabelFromEvent = ({ event }: { event: { id?: string; datum?: string | null; geplant?: boolean | null; beschreibung?: string | null } | null }) => {
  if (!event?.id) return 'kein Event'
  const datumLabel =
    event.datum ?
      DateTime.fromSQL(event.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'
  const geplantLabel = event.geplant ? ' geplant' : undefined
  const eventLabel = event?.beschreibung ?? 'nicht beschrieben'
  const label = [datumLabel, eventLabel, geplantLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}
