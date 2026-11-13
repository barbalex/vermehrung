import { first as first$ } from 'rxjs/operators'

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
}: {
  rows: T[]
  failsCheck: (row: T) => boolean
  buildUrl: (row: T) => string[]
  buildText: (row: T) => string | Promise<string>
}): Promise<QkMessage[]> =>
  Promise.all(
    rows.filter(failsCheck).map(async (row) => ({
      url: buildUrl(row),
      text: await buildText(row),
    })),
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
