import type { HerkunftId } from './Herkunft.ts';

/** Identifier type for public.herkunft_file */
export type HerkunftFileId = string & { __brand: 'public.herkunft_file' };

/** Represents the table public.herkunft_file */
export default interface HerkunftFile {
  id: HerkunftFileId;

  herkunft_id: HerkunftId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.herkunft_file */
export interface HerkunftFileInitializer {
  /** Default value: uuidv7() */
  id?: HerkunftFileId;

  herkunft_id?: HerkunftId | null;

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

/** Represents the mutator for the table public.herkunft_file */
export interface HerkunftFileMutator {
  id?: HerkunftFileId;

  herkunft_id?: HerkunftId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}