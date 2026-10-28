/** Identifier type for public.herkunft */
export type HerkunftId = string & { __brand: 'public.herkunft' };

/** Represents the table public.herkunft */
export default interface Herkunft {
  id: HerkunftId;

  nr: string | null;

  lokalname: string | null;

  gemeinde: string | null;

  kanton: string | null;

  land: string | null;

  geom_point: unknown | null;

  bemerkungen: string | null;

  changed: string | null;

  changed_by: string | null;

  wgs84_lat: number | null;

  wgs84_long: number | null;

  lv95_x: number | null;

  lv95_y: number | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _conflicts: string[] | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.herkunft */
export interface HerkunftInitializer {
  /** Default value: uuidv7() */
  id?: HerkunftId;

  nr?: string | null;

  lokalname?: string | null;

  gemeinde?: string | null;

  kanton?: string | null;

  land?: string | null;

  /** Default value: NULL::geometry */
  geom_point?: unknown | null;

  bemerkungen?: string | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: NULL::character varying */
  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  _conflicts?: string[] | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.herkunft */
export interface HerkunftMutator {
  id?: HerkunftId;

  nr?: string | null;

  lokalname?: string | null;

  gemeinde?: string | null;

  kanton?: string | null;

  land?: string | null;

  geom_point?: unknown | null;

  bemerkungen?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _conflicts?: string[] | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}