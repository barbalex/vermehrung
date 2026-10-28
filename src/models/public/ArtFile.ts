import type { ArtId } from './Art.ts';

/** Identifier type for public.art_file */
export type ArtFileId = string & { __brand: 'public.art_file' };

/** Represents the table public.art_file */
export default interface ArtFile {
  id: ArtFileId;

  art_id: ArtId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.art_file */
export interface ArtFileInitializer {
  /** Default value: uuidv7() */
  id?: ArtFileId;

  art_id?: ArtId | null;

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

/** Represents the mutator for the table public.art_file */
export interface ArtFileMutator {
  id?: ArtFileId;

  art_id?: ArtId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}