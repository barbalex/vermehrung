import type { GartenId } from './Garten.ts';
import type { PersonId } from './Person.ts';

/** Identifier type for public.gv */
export type GvId = string & { __brand: 'public.gv' };

/** Represents the table public.gv */
export default interface Gv {
  id: GvId;

  garten_id: GartenId | null;

  person_id: PersonId | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _conflicts: string[] | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.gv */
export interface GvInitializer {
  /** Default value: uuidv7() */
  id?: GvId;

  garten_id?: GartenId | null;

  person_id?: PersonId | null;

  /** Default value: now() */
  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  _conflicts?: string[] | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.gv */
export interface GvMutator {
  id?: GvId;

  garten_id?: GartenId | null;

  person_id?: PersonId | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _conflicts?: string[] | null;

  _rev_at?: number | null;

  old_id?: string | null;
}