import type { KulturId } from './Kultur.ts';
import type { PersonId } from './Person.ts';

/** Identifier type for public.bedarf */
export type BedarfId = string & { __brand: 'public.bedarf' };

/** Represents the table public.bedarf */
export default interface Bedarf {
  id: BedarfId;

  kultur_id: KulturId | null;

  person_id: PersonId | null;

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

  _conflicts: string[] | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.bedarf */
export interface BedarfInitializer {
  /** Default value: uuidv7() */
  id?: BedarfId;

  kultur_id?: KulturId | null;

  person_id?: PersonId | null;

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

  _conflicts?: string[] | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.bedarf */
export interface BedarfMutator {
  id?: BedarfId;

  kultur_id?: KulturId | null;

  person_id?: PersonId | null;

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

  _conflicts?: string[] | null;

  old_id?: string | null;
}