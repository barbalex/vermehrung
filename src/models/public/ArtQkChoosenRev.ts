/** Identifier type for public.art_qk_choosen_rev */
export type ArtQkChoosenRevId = string & { __brand: 'public.art_qk_choosen_rev' };

/** Represents the table public.art_qk_choosen_rev */
export default interface ArtQkChoosenRev {
  id: ArtQkChoosenRevId;

  art_qk_choosen_id: string | null;

  art_id: string;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  choosen: boolean | null;

  _rev_at: number | null;

  qk_id: string | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.art_qk_choosen_rev */
export interface ArtQkChoosenRevInitializer {
  /** Default value: uuidv7() */
  id?: ArtQkChoosenRevId;

  art_qk_choosen_id?: string | null;

  art_id: string;

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

  /** Default value: true */
  choosen?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  qk_id?: string | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.art_qk_choosen_rev */
export interface ArtQkChoosenRevMutator {
  id?: ArtQkChoosenRevId;

  art_qk_choosen_id?: string | null;

  art_id?: string;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  choosen?: boolean | null;

  _rev_at?: number | null;

  qk_id?: string | null;

  old_id?: string | null;
}