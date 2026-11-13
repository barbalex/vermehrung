import { first as first$ } from 'rxjs/operators'
import { DateTime } from 'luxon'

export interface QkMessage {
  url: string[]
  text: string | undefined
}

// every quality-check message has the same shape: the rows of the scope
// failing a check, each mapped to a url and a text. One builder serves
// both the Art and the Kultur qk - diverged copies of these checks
// produced real bugs (the inverted zaehlungsWithoutDatum).
export const buildQkMessages = async <T extends { id: string }>({
  rows,
  failsCheck,
  buildUrl,
  buildText,
  buildMessage,
}: {
  rows: T[]
  failsCheck: (row: T) => boolean
  // either buildUrl + buildText, or one combined buildMessage (for
  // messages whose url and text share an async resolution, e.g. a
  // zaehlung's kultur)
  buildUrl?: (row: T) => string[]
  buildText?: (row: T) => string | Promise<string>
  buildMessage?: (row: T) => QkMessage | Promise<QkMessage>
}): Promise<QkMessage[]> =>
  Promise.all(
    rows.filter(failsCheck).map(async (row) => {
      if (buildMessage) return await buildMessage(row)
      return {
        url: buildUrl?.(row) ?? [],
        text: await buildText?.(row),
      }
    }),
  )

// most messages show the row's label - resolve it once, tolerate errors
export const labelOf = async (row: unknown) => {
  const label = (row as { label?: unknown }).label as
    | {
        pipe?: (operator: unknown) => {
          toPromise?: () => Promise<string | undefined>
        }
      }
    | undefined
  try {
    return (await label?.pipe?.(first$())?.toPromise?.()) ?? ''
  } catch {
    return ''
  }
}

// lieferung messages share their text: date (or kein Datum), id and the
// geplant marker
export const lieferungText = (l: {
  id: string
  datum?: string | null
  geplant?: boolean | null
}) => {
  const datum =
    l.datum ?
      DateTime.fromJSDate(new Date(l.datum)).toFormat('yyyy.LL.dd')
    : `kein Datum`
  const geplant = l.geplant ? ', (geplant)' : ''
  return `${datum}, ID: ${l.id}${geplant}`
}
