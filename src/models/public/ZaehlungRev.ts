/** Identifier type for public.zaehlung_rev */
export type ZaehlungRevId = string & { __brand: 'public.zaehlung_rev' };

/** Represents the table public.zaehlung_rev */
export default interface ZaehlungRev {
  id: ZaehlungRevId;

  zaehlung_id: string;

  kultur_id: string | null;

  datum: string | null;

  prognose: boolean | null;

  bemerkungen: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.zaehlung_rev */
export interface ZaehlungRevInitializer {
  /** Default value: uuidv7() */
  id?: ZaehlungRevId;

  zaehlung_id: string;

  kultur_id?: string | null;

  datum?: string | null;

  /** Default value: false */
  prognose?: boolean | null;

  bemerkungen?: string | null;

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

  old_id?: string | null;
}

/** Represents the mutator for the table public.zaehlung_rev */
export interface ZaehlungRevMutator {
  id?: ZaehlungRevId;

  zaehlung_id?: string;

  kultur_id?: string | null;

  datum?: string | null;

  prognose?: boolean | null;

  bemerkungen?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}