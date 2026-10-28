/** Identifier type for public.bedarf_rev */
export type BedarfRevId = string & { __brand: 'public.bedarf_rev' };

/** Represents the table public.bedarf_rev */
export default interface BedarfRev {
  id: BedarfRevId;

  bedarf_id: string | null;

  kultur_id: string | null;

  person_id: string | null;

  jahr: number | null;

  beschreibung: string | null;

  bemerkungen: string | null;

  neues_material: string | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _rev_at: number | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.bedarf_rev */
export interface BedarfRevInitializer {
  /** Default value: uuidv7() */
  id?: BedarfRevId;

  bedarf_id?: string | null;

  kultur_id?: string | null;

  person_id?: string | null;

  jahr?: number | null;

  beschreibung?: string | null;

  bemerkungen?: string | null;

  neues_material?: string | null;

  /** Default value: now() */
  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  /** Default value: EXTRACT(epoch FROM (now() AT TIME ZONE 'utc'::text)) */
  _rev_at?: number | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.bedarf_rev */
export interface BedarfRevMutator {
  id?: BedarfRevId;

  bedarf_id?: string | null;

  kultur_id?: string | null;

  person_id?: string | null;

  jahr?: number | null;

  beschreibung?: string | null;

  bemerkungen?: string | null;

  neues_material?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _rev_at?: number | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  old_id?: string | null;
}