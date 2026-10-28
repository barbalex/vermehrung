/** Identifier type for public.event_rev */
export type EventRevId = string & { __brand: 'public.event_rev' };

/** Represents the table public.event_rev */
export default interface EventRev {
  id: EventRevId;

  event_id: string;

  kultur_id: string | null;

  teilkultur_id: string | null;

  person_id: string | null;

  beschreibung: string | null;

  geplant: boolean | null;

  datum: string | null;

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

/** Represents the initializer for the table public.event_rev */
export interface EventRevInitializer {
  /** Default value: uuidv7() */
  id?: EventRevId;

  event_id: string;

  kultur_id?: string | null;

  teilkultur_id?: string | null;

  person_id?: string | null;

  beschreibung?: string | null;

  /** Default value: false */
  geplant?: boolean | null;

  datum?: string | null;

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

/** Represents the mutator for the table public.event_rev */
export interface EventRevMutator {
  id?: EventRevId;

  event_id?: string;

  kultur_id?: string | null;

  teilkultur_id?: string | null;

  person_id?: string | null;

  beschreibung?: string | null;

  geplant?: boolean | null;

  datum?: string | null;

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