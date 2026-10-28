/** Identifier type for public.garten_rev */
export type GartenRevId = string & { __brand: 'public.garten_rev' };

/** Represents the table public.garten_rev */
export default interface GartenRev {
  id: GartenRevId;

  garten_id: string;

  name: string | null;

  person_id: string | null;

  strasse: string | null;

  plz: number | null;

  ort: string | null;

  geom_point: unknown | null;

  aktiv: boolean | null;

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

/** Represents the initializer for the table public.garten_rev */
export interface GartenRevInitializer {
  /** Default value: uuidv7() */
  id?: GartenRevId;

  garten_id: string;

  name?: string | null;

  person_id?: string | null;

  strasse?: string | null;

  plz?: number | null;

  ort?: string | null;

  /** Default value: NULL::geometry */
  geom_point?: unknown | null;

  /** Default value: true */
  aktiv?: boolean | null;

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

/** Represents the mutator for the table public.garten_rev */
export interface GartenRevMutator {
  id?: GartenRevId;

  garten_id?: string;

  name?: string | null;

  person_id?: string | null;

  strasse?: string | null;

  plz?: number | null;

  ort?: string | null;

  geom_point?: unknown | null;

  aktiv?: boolean | null;

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