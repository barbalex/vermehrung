import type { KulturId } from './Kultur.ts';

/** Identifier type for public.kultur_file */
export type KulturFileId = string & { __brand: 'public.kultur_file' };

/** Represents the table public.kultur_file */
export default interface KulturFile {
  id: KulturFileId;

  kultur_id: KulturId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.kultur_file */
export interface KulturFileInitializer {
  /** Default value: uuidv7() */
  id?: KulturFileId;

  kultur_id?: KulturId | null;

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

/** Represents the mutator for the table public.kultur_file */
export interface KulturFileMutator {
  id?: KulturFileId;

  kultur_id?: KulturId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}