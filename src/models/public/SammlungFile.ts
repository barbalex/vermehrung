import type { SammlungId } from './Sammlung.ts';

/** Identifier type for public.sammlung_file */
export type SammlungFileId = string & { __brand: 'public.sammlung_file' };

/** Represents the table public.sammlung_file */
export default interface SammlungFile {
  id: SammlungFileId;

  sammlung_id: SammlungId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.sammlung_file */
export interface SammlungFileInitializer {
  /** Default value: uuidv7() */
  id?: SammlungFileId;

  sammlung_id?: SammlungId | null;

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

/** Represents the mutator for the table public.sammlung_file */
export interface SammlungFileMutator {
  id?: SammlungFileId;

  sammlung_id?: SammlungId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}