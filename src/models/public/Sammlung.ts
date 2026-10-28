import type { ArtId } from './Art.ts';
import type { PersonId } from './Person.ts';
import type { HerkunftId } from './Herkunft.ts';

/** Identifier type for public.sammlung */
export type SammlungId = string & { __brand: 'public.sammlung' };

/** Represents the table public.sammlung */
export default interface Sammlung {
  id: SammlungId;

  art_id: ArtId | null;

  person_id: PersonId | null;

  herkunft_id: HerkunftId | null;

  nr: string | null;

  datum: string | null;

  von_anzahl_individuen: number | null;

  anzahl_pflanzen: number | null;

  gramm_samen: number | null;

  andere_menge: string | null;

  geom_point: unknown | null;

  geplant: boolean | null;

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

/** Represents the initializer for the table public.sammlung */
export interface SammlungInitializer {
  /** Default value: uuidv7() */
  id?: SammlungId;

  art_id?: ArtId | null;

  person_id?: PersonId | null;

  herkunft_id?: HerkunftId | null;

  nr?: string | null;

  datum?: string | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

  /** Default value: NULL::geometry */
  geom_point?: unknown | null;

  /** Default value: false */
  geplant?: boolean | null;

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

/** Represents the mutator for the table public.sammlung */
export interface SammlungMutator {
  id?: SammlungId;

  art_id?: ArtId | null;

  person_id?: PersonId | null;

  herkunft_id?: HerkunftId | null;

  nr?: string | null;

  datum?: string | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

  geom_point?: unknown | null;

  geplant?: boolean | null;

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