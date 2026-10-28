// prop shapes shared by the form controls

/** the synthetic event the form controls hand to saveToDb */
export interface SaveToDbEvent {
  target: { name?: string; value: unknown }
}

export type SaveToDbFn = (event: SaveToDbEvent) => void

/** a watermelon row read generically by table name */
export interface GenericRow {
  id?: string
  _rev?: string | null
  _revisions?: string[] | null
  [key: string]: unknown
}

/** a watermelon model row as the history/conflict flows use it */
export interface WmRow extends Record<string, unknown> {
  id?: string
  _rev?: string | null
  _revisions?: string[] | null
  _conflicts?: string[] | null
  _depth?: number | null
  update: (cb: (record: Record<string, unknown>) => void) => Promise<unknown>
  removeConflict?: (rev: string) => Promise<void>
}

/** a revision row delivered by the api (history, conflicts) */
export interface RevRow extends Record<string, unknown> {
  id?: string
  _rev?: string | null
  _depth?: number | null
  _revisions?: string[] | null
}
