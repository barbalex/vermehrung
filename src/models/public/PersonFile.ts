import type { PersonId } from './Person.ts';

/** Identifier type for public.person_file */
export type PersonFileId = string & { __brand: 'public.person_file' };

/** Represents the table public.person_file */
export default interface PersonFile {
  id: PersonFileId;

  person_id: PersonId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.person_file */
export interface PersonFileInitializer {
  /** Default value: uuidv7() */
  id?: PersonFileId;

  person_id?: PersonId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.person_file */
export interface PersonFileMutator {
  id?: PersonFileId;

  person_id?: PersonId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}