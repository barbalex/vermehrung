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
