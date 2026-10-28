import type { KulturId } from './Kultur.ts';

/** Identifier type for public.zaehlung */
export type ZaehlungId = string & { __brand: 'public.zaehlung' };

/** Represents the table public.zaehlung */
export default interface Zaehlung {
  id: ZaehlungId;

  kultur_id: KulturId | null;

  datum: string | null;

  prognose: boolean | null;

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

/** Represents the initializer for the table public.zaehlung */
export interface ZaehlungInitializer {
  /** Default value: uuidv7() */
  id?: ZaehlungId;

  kultur_id?: KulturId | null;

  datum?: string | null;

  /** Default value: false */
  prognose?: boolean | null;

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

/** Represents the mutator for the table public.zaehlung */
export interface ZaehlungMutator {
  id?: ZaehlungId;

  kultur_id?: KulturId | null;

  datum?: string | null;

  prognose?: boolean | null;

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