/** Identifier type for public.art_qk_rev */
export type ArtQkRevId = string & { __brand: 'public.art_qk_rev' };

/** Represents the table public.art_qk_rev */
export default interface ArtQkRev {
  id: ArtQkRevId;

  art_qk_id: string | null;

  name: string | null;

  titel: string | null;

  beschreibung: string | null;

  sort: number | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  changed: string | null;

  changed_by: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.art_qk_rev */
export interface ArtQkRevInitializer {
  /** Default value: uuidv7() */
  id?: ArtQkRevId;

  art_qk_id?: string | null;

  name?: string | null;

  titel?: string | null;

  beschreibung?: string | null;

  sort?: number | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: now() */
  changed?: string | null;

  changed_by?: string | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.art_qk_rev */
export interface ArtQkRevMutator {
  id?: ArtQkRevId;

  art_qk_id?: string | null;

  name?: string | null;

  titel?: string | null;

  beschreibung?: string | null;

  sort?: number | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}