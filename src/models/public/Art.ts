/** Identifier type for public.art */
export type ArtId = string & { __brand: 'public.art' };

/** Represents the table public.art */
export default interface Art {
  id: ArtId;

  ae_id: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _conflicts: string[] | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  set: string | null;

  apflora_av: string | null;

  apflora_ap: boolean | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.art */
export interface ArtInitializer {
  /** Default value: uuidv7() */
  id?: ArtId;

  ae_id?: string | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: NULL::character varying */
  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  _conflicts?: string[] | null;

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

/** Represents the mutator for the table public.art */
export interface ArtMutator {
  id?: ArtId;

  ae_id?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _conflicts?: string[] | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  set?: string | null;

  apflora_av?: string | null;

  apflora_ap?: boolean | null;

  old_id?: string | null;
}