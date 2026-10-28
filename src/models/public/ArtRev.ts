/** Identifier type for public.art_rev */
export type ArtRevId = string & { __brand: 'public.art_rev' };

/** Represents the table public.art_rev */
export default interface ArtRev {
  id: ArtRevId;

  art_id: string;

  ae_id: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  set: string | null;

  apflora_av: string | null;

  apflora_ap: boolean | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.art_rev */
export interface ArtRevInitializer {
  /** Default value: uuidv7() */
  id?: ArtRevId;

  art_id: string;

  ae_id?: string | null;

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

  set?: string | null;

  apflora_av?: string | null;

  /** Default value: false */
  apflora_ap?: boolean | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.art_rev */
export interface ArtRevMutator {
  id?: ArtRevId;

  art_id?: string;

  ae_id?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  set?: string | null;

  apflora_av?: string | null;

  apflora_ap?: boolean | null;

  old_id?: string | null;
}