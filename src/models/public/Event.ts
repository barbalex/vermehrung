import type { KulturId } from './Kultur.ts';
import type { TeilkulturId } from './Teilkultur.ts';
import type { PersonId } from './Person.ts';

/** Identifier type for public.event */
export type EventId = string & { __brand: 'public.event' };

/** Represents the table public.event */
export default interface Event {
  id: EventId;

  kultur_id: KulturId | null;

  teilkultur_id: TeilkulturId | null;

  person_id: PersonId | null;

  beschreibung: string | null;

  geplant: boolean | null;

  datum: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _conflicts: string[] | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.event */
export interface EventInitializer {
  /** Default value: uuidv7() */
  id?: EventId;

  kultur_id?: KulturId | null;

  teilkultur_id?: TeilkulturId | null;

  person_id?: PersonId | null;

  beschreibung?: string | null;

  /** Default value: false */
  geplant?: boolean | null;

  datum?: string | null;

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

/** Represents the mutator for the table public.event */
export interface EventMutator {
  id?: EventId;

  kultur_id?: KulturId | null;

  teilkultur_id?: TeilkulturId | null;

  person_id?: PersonId | null;

  beschreibung?: string | null;

  geplant?: boolean | null;

  datum?: string | null;

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