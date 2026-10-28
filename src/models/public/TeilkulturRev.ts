/** Identifier type for public.teilkultur_rev */
export type TeilkulturRevId = string & { __brand: 'public.teilkultur_rev' };

/** Represents the table public.teilkultur_rev */
export default interface TeilkulturRev {
  id: TeilkulturRevId;

  teilkultur_id: string;

  kultur_id: string | null;

  name: string | null;

  ort1: string | null;

  ort2: string | null;

  ort3: string | null;

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

/** Represents the initializer for the table public.teilkultur_rev */
export interface TeilkulturRevInitializer {
  /** Default value: uuidv7() */
  id?: TeilkulturRevId;

  teilkultur_id: string;

  kultur_id?: string | null;

  name?: string | null;

  ort1?: string | null;

  ort2?: string | null;

  ort3?: string | null;

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

/** Represents the mutator for the table public.teilkultur_rev */
export interface TeilkulturRevMutator {
  id?: TeilkulturRevId;

  teilkultur_id?: string;

  kultur_id?: string | null;

  name?: string | null;

  ort1?: string | null;

  ort2?: string | null;

  ort3?: string | null;

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