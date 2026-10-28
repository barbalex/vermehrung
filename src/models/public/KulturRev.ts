/** Identifier type for public.kultur_rev */
export type KulturRevId = string & { __brand: 'public.kultur_rev' };

/** Represents the table public.kultur_rev */
export default interface KulturRev {
  id: KulturRevId;

  kultur_id: string;

  art_id: string | null;

  herkunft_id: string | null;

  garten_id: string | null;

  zwischenlager: boolean | null;

  erhaltungskultur: boolean | null;

  von_anzahl_individuen: number | null;

  bemerkungen: string | null;

  aktiv: boolean | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.kultur_rev */
export interface KulturRevInitializer {
  /** Default value: uuidv7() */
  id?: KulturRevId;

  kultur_id: string;

  art_id?: string | null;

  herkunft_id?: string | null;

  garten_id?: string | null;

  /** Default value: false */
  zwischenlager?: boolean | null;

  /** Default value: false */
  erhaltungskultur?: boolean | null;

  von_anzahl_individuen?: number | null;

  bemerkungen?: string | null;

  /** Default value: true */
  aktiv?: boolean | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: NULL::character varying */
  changed_by?: string | null;

  _rev: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.kultur_rev */
export interface KulturRevMutator {
  id?: KulturRevId;

  kultur_id?: string;

  art_id?: string | null;

  herkunft_id?: string | null;

  garten_id?: string | null;

  zwischenlager?: boolean | null;

  erhaltungskultur?: boolean | null;

  von_anzahl_individuen?: number | null;

  bemerkungen?: string | null;

  aktiv?: boolean | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}