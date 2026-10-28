/** Identifier type for public.kultur_qk_choosen_rev */
export type KulturQkChoosenRevId = string & { __brand: 'public.kultur_qk_choosen_rev' };

/** Represents the table public.kultur_qk_choosen_rev */
export default interface KulturQkChoosenRev {
  id: KulturQkChoosenRevId;

  kultur_qk_choosen_id: string | null;

  kultur_id: string;

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

/** Represents the initializer for the table public.kultur_qk_choosen_rev */
export interface KulturQkChoosenRevInitializer {
  /** Default value: uuidv7() */
  id?: KulturQkChoosenRevId;

  kultur_qk_choosen_id?: string | null;

  kultur_id: string;

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

/** Represents the mutator for the table public.kultur_qk_choosen_rev */
export interface KulturQkChoosenRevMutator {
  id?: KulturQkChoosenRevId;

  kultur_qk_choosen_id?: string | null;

  kultur_id?: string;

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