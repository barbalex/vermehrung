import type { LieferungId } from './Lieferung.ts';

/** Identifier type for public.lieferung_file */
export type LieferungFileId = string & { __brand: 'public.lieferung_file' };

/** Represents the table public.lieferung_file */
export default interface LieferungFile {
  id: LieferungFileId;

  lieferung_id: LieferungId | null;

  file_id: string | null;

  file_mime_type: string | null;

  name: string | null;

  beschreibung: string | null;

  changed: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.lieferung_file */
export interface LieferungFileInitializer {
  /** Default value: uuidv7() */
  id?: LieferungFileId;

  lieferung_id?: LieferungId | null;

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

/** Represents the mutator for the table public.lieferung_file */
export interface LieferungFileMutator {
  id?: LieferungFileId;

  lieferung_id?: LieferungId | null;

  file_id?: string | null;

  file_mime_type?: string | null;

  name?: string | null;

  beschreibung?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}