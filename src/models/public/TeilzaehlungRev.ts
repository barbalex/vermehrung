/** Identifier type for public.teilzaehlung_rev */
export type TeilzaehlungRevId = string & { __brand: 'public.teilzaehlung_rev' };

/** Represents the table public.teilzaehlung_rev */
export default interface TeilzaehlungRev {
  id: TeilzaehlungRevId;

  teilzaehlung_id: string;

  zaehlung_id: string | null;

  teilkultur_id: string | null;

  anzahl_pflanzen: number | null;

  anzahl_auspflanzbereit: number | null;

  anzahl_mutterpflanzen: number | null;

  andere_menge: string | null;

  auspflanzbereit_beschreibung: string | null;

  bemerkungen: string | null;

  prognose_von_tz: string | null;

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

/** Represents the initializer for the table public.teilzaehlung_rev */
export interface TeilzaehlungRevInitializer {
  /** Default value: uuidv7() */
  id?: TeilzaehlungRevId;

  teilzaehlung_id: string;

  zaehlung_id?: string | null;

  teilkultur_id?: string | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  anzahl_mutterpflanzen?: number | null;

  andere_menge?: string | null;

  auspflanzbereit_beschreibung?: string | null;

  bemerkungen?: string | null;

  prognose_von_tz?: string | null;

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

/** Represents the mutator for the table public.teilzaehlung_rev */
export interface TeilzaehlungRevMutator {
  id?: TeilzaehlungRevId;

  teilzaehlung_id?: string;

  zaehlung_id?: string | null;

  teilkultur_id?: string | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  anzahl_mutterpflanzen?: number | null;

  andere_menge?: string | null;

  auspflanzbereit_beschreibung?: string | null;

  bemerkungen?: string | null;

  prognose_von_tz?: string | null;

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