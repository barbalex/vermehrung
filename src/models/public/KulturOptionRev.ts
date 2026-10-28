/** Identifier type for public.kultur_option_rev */
export type KulturOptionRevId = string & { __brand: 'public.kultur_option_rev' };

/** Represents the table public.kultur_option_rev */
export default interface KulturOptionRev {
  id: KulturOptionRevId;

  kultur_id: string;

  z_bemerkungen: boolean | null;

  tz_teilkultur_id: boolean | null;

  tz_anzahl_mutterpflanzen: boolean | null;

  tz_andere_menge: boolean | null;

  tz_auspflanzbereit_beschreibung: boolean | null;

  tz_bemerkungen: boolean | null;

  tk: boolean | null;

  tk_bemerkungen: boolean | null;

  ev_teilkultur_id: boolean | null;

  ev_geplant: boolean | null;

  ev_person_id: boolean | null;

  ev_datum: boolean | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  changed: string | null;

  changed_by: string | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.kultur_option_rev */
export interface KulturOptionRevInitializer {
  /** Default value: uuidv7() */
  id?: KulturOptionRevId;

  kultur_id: string;

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

  /** Default value: false */
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

  _rev: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: now() */
  changed?: string | null;

  changed_by?: string | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.kultur_option_rev */
export interface KulturOptionRevMutator {
  id?: KulturOptionRevId;

  kultur_id?: string;

  z_bemerkungen?: boolean | null;

  tz_teilkultur_id?: boolean | null;

  tz_anzahl_mutterpflanzen?: boolean | null;

  tz_andere_menge?: boolean | null;

  tz_auspflanzbereit_beschreibung?: boolean | null;

  tz_bemerkungen?: boolean | null;

  tk?: boolean | null;

  tk_bemerkungen?: boolean | null;

  ev_teilkultur_id?: boolean | null;

  ev_geplant?: boolean | null;

  ev_person_id?: boolean | null;

  ev_datum?: boolean | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev_at?: number | null;

  old_id?: string | null;
}