/** Identifier type for public.sammlung_rev */
export type SammlungRevId = string & { __brand: 'public.sammlung_rev' };

/** Represents the table public.sammlung_rev */
export default interface SammlungRev {
  id: SammlungRevId;

  sammlung_id: string;

  art_id: string | null;

  person_id: string | null;

  herkunft_id: string | null;

  nr: string | null;

  datum: string | null;

  von_anzahl_individuen: number | null;

  anzahl_pflanzen: number | null;

  gramm_samen: number | null;

  andere_menge: string | null;

  geom_point: unknown | null;

  geplant: boolean | null;

  bemerkungen: string | null;

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

/** Represents the initializer for the table public.sammlung_rev */
export interface SammlungRevInitializer {
  /** Default value: uuidv7() */
  id?: SammlungRevId;

  sammlung_id: string;

  art_id?: string | null;

  person_id?: string | null;

  herkunft_id?: string | null;

  nr?: string | null;

  datum?: string | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

  /** Default value: NULL::geometry */
  geom_point?: unknown | null;

  /** Default value: false */
  geplant?: boolean | null;

  bemerkungen?: string | null;

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

/** Represents the mutator for the table public.sammlung_rev */
export interface SammlungRevMutator {
  id?: SammlungRevId;

  sammlung_id?: string;

  art_id?: string | null;

  person_id?: string | null;

  herkunft_id?: string | null;

  nr?: string | null;

  datum?: string | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

  geom_point?: unknown | null;

  geplant?: boolean | null;

  bemerkungen?: string | null;

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