/** Identifier type for public.herkunft_rev */
export type HerkunftRevId = string & { __brand: 'public.herkunft_rev' };

/** Represents the table public.herkunft_rev */
export default interface HerkunftRev {
  id: HerkunftRevId;

  herkunft_id: string;

  nr: string | null;

  lokalname: string | null;

  gemeinde: string | null;

  kanton: string | null;

  land: string | null;

  geom_point: unknown | null;

  bemerkungen: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.herkunft_rev */
export interface HerkunftRevInitializer {
  /** Default value: uuidv7() */
  id?: HerkunftRevId;

  herkunft_id: string;

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

  _rev: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.herkunft_rev */
export interface HerkunftRevMutator {
  id?: HerkunftRevId;

  herkunft_id?: string;

  nr?: string | null;

  lokalname?: string | null;

  gemeinde?: string | null;

  kanton?: string | null;

  land?: string | null;

  geom_point?: unknown | null;

  bemerkungen?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}