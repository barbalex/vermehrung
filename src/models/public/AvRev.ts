/** Identifier type for public.av_rev */
export type AvRevId = string & { __brand: 'public.av_rev' };

/** Represents the table public.av_rev */
export default interface AvRev {
  id: AvRevId;

  av_id: string | null;

  art_id: string | null;

  person_id: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.av_rev */
export interface AvRevInitializer {
  /** Default value: uuidv7() */
  id?: AvRevId;

  av_id?: string | null;

  art_id?: string | null;

  person_id?: string | null;

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

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.av_rev */
export interface AvRevMutator {
  id?: AvRevId;

  av_id?: string | null;

  art_id?: string | null;

  person_id?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}