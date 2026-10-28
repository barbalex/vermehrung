/** Identifier type for public.kultur_qk */
export type KulturQkId = string & { __brand: 'public.kultur_qk' };

/** Represents the table public.kultur_qk */
export default interface KulturQk {
  id: KulturQkId;

  /** Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt */
  name: string;

  titel: string | null;

  beschreibung: string | null;

  sort: number | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _conflicts: string[] | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.kultur_qk */
export interface KulturQkInitializer {
  /** Default value: uuidv7() */
  id?: KulturQkId;

  /** Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt */
  name: string;

  titel?: string | null;

  beschreibung?: string | null;

  sort?: number | null;

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

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.kultur_qk */
export interface KulturQkMutator {
  id?: KulturQkId;

  /** Primärschlüssel. Wird auch in Abfragen und createMessageFunctions benutzt */
  name?: string;

  titel?: string | null;

  beschreibung?: string | null;

  sort?: number | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _conflicts?: string[] | null;

  _rev_at?: number | null;

  old_id?: string | null;
}