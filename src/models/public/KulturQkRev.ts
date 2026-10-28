/** Identifier type for public.kultur_qk_rev */
export type KulturQkRevName = string & { __brand: 'public.kultur_qk_rev' };

/** Represents the table public.kultur_qk_rev */
export default interface KulturQkRev {
  name: KulturQkRevName;

  id: string | null;

  kultur_qk_id: string | null;

  titel: string | null;

  beschreibung: string | null;

  sort: number | null;

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

/** Represents the initializer for the table public.kultur_qk_rev */
export interface KulturQkRevInitializer {
  name: KulturQkRevName;

  /** Default value: uuidv7() */
  id?: string | null;

  kultur_qk_id?: string | null;

  titel?: string | null;

  beschreibung?: string | null;

  sort?: number | null;

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

/** Represents the mutator for the table public.kultur_qk_rev */
export interface KulturQkRevMutator {
  name?: KulturQkRevName;

  id?: string | null;

  kultur_qk_id?: string | null;

  titel?: string | null;

  beschreibung?: string | null;

  sort?: number | null;

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