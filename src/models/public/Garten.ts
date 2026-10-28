import type { PersonId } from './Person.ts';

/** Identifier type for public.garten */
export type GartenId = string & { __brand: 'public.garten' };

/** Represents the table public.garten */
export default interface Garten {
  id: GartenId;

  name: string | null;

  person_id: PersonId | null;

  strasse: string | null;

  plz: number | null;

  ort: string | null;

  geom_point: unknown | null;

  aktiv: boolean | null;

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

/** Represents the initializer for the table public.garten */
export interface GartenInitializer {
  /** Default value: uuidv7() */
  id?: GartenId;

  name?: string | null;

  person_id?: PersonId | null;

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

/** Represents the mutator for the table public.garten */
export interface GartenMutator {
  id?: GartenId;

  name?: string | null;

  person_id?: PersonId | null;

  strasse?: string | null;

  plz?: number | null;

  ort?: string | null;

  geom_point?: unknown | null;

  aktiv?: boolean | null;

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