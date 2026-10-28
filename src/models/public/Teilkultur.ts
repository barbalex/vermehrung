import type { KulturId } from './Kultur.ts';

/** Identifier type for public.teilkultur */
export type TeilkulturId = string & { __brand: 'public.teilkultur' };

/** Represents the table public.teilkultur */
export default interface Teilkultur {
  id: TeilkulturId;

  kultur_id: KulturId | null;

  name: string | null;

  ort1: string | null;

  ort2: string | null;

  ort3: string | null;

  bemerkungen: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _conflicts: string[] | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.teilkultur */
export interface TeilkulturInitializer {
  /** Default value: uuidv7() */
  id?: TeilkulturId;

  kultur_id?: KulturId | null;

  name?: string | null;

  ort1?: string | null;

  ort2?: string | null;

  ort3?: string | null;

  bemerkungen?: string | null;

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

  old_id?: string | null;
}

/** Represents the mutator for the table public.teilkultur */
export interface TeilkulturMutator {
  id?: TeilkulturId;

  kultur_id?: KulturId | null;

  name?: string | null;

  ort1?: string | null;

  ort2?: string | null;

  ort3?: string | null;

  bemerkungen?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _conflicts?: string[] | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}