import type { GartenId } from './Garten.ts';

/** Identifier type for public.garten_file */
export type GartenFileId = string & { __brand: 'public.garten_file' };

/** Represents the table public.garten_file */
export default interface GartenFile {
  id: GartenFileId;

  garten_id: GartenId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.garten_file */
export interface GartenFileInitializer {
  /** Default value: uuidv7() */
  id?: GartenFileId;

  garten_id?: GartenId | null;

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

/** Represents the mutator for the table public.garten_file */
export interface GartenFileMutator {
  id?: GartenFileId;

  garten_id?: GartenId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}