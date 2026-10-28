import type { KulturId } from './Kultur.ts';

/** Represents the table public.kultur_option */
export default interface KulturOption {
  id: KulturId;

  z_bemerkungen: boolean | null;

  tz_teilkultur_id: boolean | null;

  tz_anzahl_mutterpflanzen: boolean | null;

  tz_andere_menge: boolean | null;

  tz_auspflanzbereit_beschreibung: boolean | null;

  tz_bemerkungen: boolean | null;

  /** opt-in Option für Teilkulturen */
  tk: boolean | null;

  tk_bemerkungen: boolean | null;

  ev_teilkultur_id: boolean | null;

  ev_geplant: boolean | null;

  ev_person_id: boolean | null;

  ev_datum: boolean | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _conflicts: string[] | null;

  changed: string | null;

  changed_by: string | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.kultur_option */
export interface KulturOptionInitializer {
  /** Default value: uuidv7() */
  id?: KulturId;

  /** Default value: true */
  z_bemerkungen?: boolean | null;

  /** Default value: true */
  tz_teilkultur_id?: boolean | null;

  /** Default value: true */
  tz_anzahl_mutterpflanzen?: boolean | null;

  /** Default value: true */
  tz_andere_menge?: boolean | null;

  /** Default value: true */
  tz_auspflanzbereit_beschreibung?: boolean | null;

  /** Default value: true */
  tz_bemerkungen?: boolean | null;

  /**
   * opt-in Option für Teilkulturen
   * Default value: false
   */
  tk?: boolean | null;

  /** Default value: true */
  tk_bemerkungen?: boolean | null;

  /** Default value: true */
  ev_teilkultur_id?: boolean | null;

  /** Default value: true */
  ev_geplant?: boolean | null;

  /** Default value: true */
  ev_person_id?: boolean | null;

  /** Default value: true */
  ev_datum?: boolean | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  _conflicts?: string[] | null;

  /** Default value: now() */
  changed?: string | null;

  changed_by?: string | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.kultur_option */
export interface KulturOptionMutator {
  id?: KulturId;

  z_bemerkungen?: boolean | null;

  tz_teilkultur_id?: boolean | null;

  tz_anzahl_mutterpflanzen?: boolean | null;

  tz_andere_menge?: boolean | null;

  tz_auspflanzbereit_beschreibung?: boolean | null;

  tz_bemerkungen?: boolean | null;

  /** opt-in Option für Teilkulturen */
  tk?: boolean | null;

  tk_bemerkungen?: boolean | null;

  ev_teilkultur_id?: boolean | null;

  ev_geplant?: boolean | null;

  ev_person_id?: boolean | null;

  ev_datum?: boolean | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _conflicts?: string[] | null;

  changed?: string | null;

  changed_by?: string | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}