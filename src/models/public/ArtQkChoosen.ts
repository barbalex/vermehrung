import type { ArtId } from './Art.ts';
import type { ArtQkId } from './ArtQk.ts';

/** Identifier type for public.art_qk_choosen */
export type ArtQkChoosenId = string & { __brand: 'public.art_qk_choosen' };

/** Represents the table public.art_qk_choosen */
export default interface ArtQkChoosen {
  id: ArtQkChoosenId;

  art_id: ArtId;

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

  qk_id: ArtQkId;

  old_id: string | null;
}

/** Represents the initializer for the table public.art_qk_choosen */
export interface ArtQkChoosenInitializer {
  /** Default value: uuidv7() */
  id?: ArtQkChoosenId;

  art_id: ArtId;

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

  qk_id: ArtQkId;

  old_id?: string | null;
}

/** Represents the mutator for the table public.art_qk_choosen */
export interface ArtQkChoosenMutator {
  id?: ArtQkChoosenId;

  art_id?: ArtId;

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

  qk_id?: ArtQkId;

  old_id?: string | null;
}