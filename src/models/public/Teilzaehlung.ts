import type { ZaehlungId } from './Zaehlung.ts';
import type { TeilkulturId } from './Teilkultur.ts';

/** Identifier type for public.teilzaehlung */
export type TeilzaehlungId = string & { __brand: 'public.teilzaehlung' };

/** Represents the table public.teilzaehlung */
export default interface Teilzaehlung {
  id: TeilzaehlungId;

  zaehlung_id: ZaehlungId | null;

  teilkultur_id: TeilkulturId | null;

  anzahl_pflanzen: number | null;

  anzahl_auspflanzbereit: number | null;

  anzahl_mutterpflanzen: number | null;

  andere_menge: string | null;

  auspflanzbereit_beschreibung: string | null;

  bemerkungen: string | null;

  prognose_von_tz: TeilzaehlungId | null;

  changed: string | null;

  changed_by: string | null;

  _rev: string | null;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _conflicts: string[] | null;

  _deleted: boolean | null;

  _rev_at: number | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.teilzaehlung */
export interface TeilzaehlungInitializer {
  /** Default value: uuidv7() */
  id?: TeilzaehlungId;

  zaehlung_id?: ZaehlungId | null;

  teilkultur_id?: TeilkulturId | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  anzahl_mutterpflanzen?: number | null;

  andere_menge?: string | null;

  auspflanzbereit_beschreibung?: string | null;

  bemerkungen?: string | null;

  prognose_von_tz?: TeilzaehlungId | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: NULL::character varying */
  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  _conflicts?: string[] | null;

  /** Default value: false */
  _deleted?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.teilzaehlung */
export interface TeilzaehlungMutator {
  id?: TeilzaehlungId;

  zaehlung_id?: ZaehlungId | null;

  teilkultur_id?: TeilkulturId | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  anzahl_mutterpflanzen?: number | null;

  andere_menge?: string | null;

  auspflanzbereit_beschreibung?: string | null;

  bemerkungen?: string | null;

  prognose_von_tz?: TeilzaehlungId | null;

  changed?: string | null;

  changed_by?: string | null;

  _rev?: string | null;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _conflicts?: string[] | null;

  _deleted?: boolean | null;

  _rev_at?: number | null;

  old_id?: string | null;
}