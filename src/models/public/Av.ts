import type { ArtId } from './Art.ts';
import type { PersonId } from './Person.ts';

/** Identifier type for public.av */
export type AvId = string & { __brand: 'public.av' };

/** Represents the table public.av */
export default interface Av {
  id: AvId;

  art_id: ArtId;

  person_id: PersonId;

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

/** Represents the initializer for the table public.av */
export interface AvInitializer {
  /** Default value: uuidv7() */
  id?: AvId;

  art_id: ArtId;

  person_id: PersonId;

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

/** Represents the mutator for the table public.av */
export interface AvMutator {
  id?: AvId;

  art_id?: ArtId;

  person_id?: PersonId;

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