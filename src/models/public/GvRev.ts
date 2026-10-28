/** Identifier type for public.gv_rev */
export type GvRevId = string & { __brand: 'public.gv_rev' };

/** Represents the table public.gv_rev */
export default interface GvRev {
  id: GvRevId;

  gv_id: string | null;

  garten_id: string | null;

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

/** Represents the initializer for the table public.gv_rev */
export interface GvRevInitializer {
  /** Default value: uuidv7() */
  id?: GvRevId;

  gv_id?: string | null;

  garten_id?: string | null;

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

/** Represents the mutator for the table public.gv_rev */
export interface GvRevMutator {
  id?: GvRevId;

  gv_id?: string | null;

  garten_id?: string | null;

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