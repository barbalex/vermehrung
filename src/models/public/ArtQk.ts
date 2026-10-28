/** Identifier type for public.art_qk */
export type ArtQkId = string & { __brand: 'public.art_qk' };

/** Represents the table public.art_qk */
export default interface ArtQk {
  id: ArtQkId;

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

/** Represents the initializer for the table public.art_qk */
export interface ArtQkInitializer {
  /** Default value: uuidv7() */
  id?: ArtQkId;

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

/** Represents the mutator for the table public.art_qk */
export interface ArtQkMutator {
  id?: ArtQkId;

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