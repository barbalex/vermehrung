import type { KulturId } from './Kultur.ts';
import type { KulturQkId } from './KulturQk.ts';

/** Identifier type for public.kultur_qk_choosen */
export type KulturQkChoosenId = string & { __brand: 'public.kultur_qk_choosen' };

/** Represents the table public.kultur_qk_choosen */
export default interface KulturQkChoosen {
  id: KulturQkChoosenId;

  kultur_id: KulturId;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _conflicts: string[] | null;

  choosen: boolean | null;

  _rev_at: number | null;

  qk_id: KulturQkId;

  old_id: string | null;
}

/** Represents the initializer for the table public.kultur_qk_choosen */
export interface KulturQkChoosenInitializer {
  /** Default value: uuidv7() */
  id?: KulturQkChoosenId;

  kultur_id: KulturId;

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

  /** Default value: true */
  choosen?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  qk_id: KulturQkId;

  old_id?: string | null;
}

/** Represents the mutator for the table public.kultur_qk_choosen */
export interface KulturQkChoosenMutator {
  id?: KulturQkChoosenId;

  kultur_id?: KulturId;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _conflicts?: string[] | null;

  choosen?: boolean | null;

  _rev_at?: number | null;

  qk_id?: KulturQkId;

  old_id?: string | null;
}