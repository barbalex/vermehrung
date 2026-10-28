/** Identifier type for public.lieferung_rev */
export type LieferungRevId = string & { __brand: 'public.lieferung_rev' };

/** Represents the table public.lieferung_rev */
export default interface LieferungRev {
  id: LieferungRevId;

  lieferung_id: string;

  sammel_lieferung_id: string | null;

  art_id: string | null;

  person_id: string | null;

  von_sammlung_id: string | null;

  von_kultur_id: string | null;

  datum: string | null;

  nach_kultur_id: string | null;

  nach_ausgepflanzt: boolean | null;

  von_anzahl_individuen: number | null;

  anzahl_pflanzen: number | null;

  anzahl_auspflanzbereit: number | null;

  gramm_samen: number | null;

  andere_menge: string | null;

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

/** Represents the initializer for the table public.lieferung_rev */
export interface LieferungRevInitializer {
  /** Default value: uuidv7() */
  id?: LieferungRevId;

  lieferung_id: string;

  sammel_lieferung_id?: string | null;

  art_id?: string | null;

  person_id?: string | null;

  von_sammlung_id?: string | null;

  von_kultur_id?: string | null;

  datum?: string | null;

  nach_kultur_id?: string | null;

  /** Default value: false */
  nach_ausgepflanzt?: boolean | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

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

/** Represents the mutator for the table public.lieferung_rev */
export interface LieferungRevMutator {
  id?: LieferungRevId;

  lieferung_id?: string;

  sammel_lieferung_id?: string | null;

  art_id?: string | null;

  person_id?: string | null;

  von_sammlung_id?: string | null;

  von_kultur_id?: string | null;

  datum?: string | null;

  nach_kultur_id?: string | null;

  nach_ausgepflanzt?: boolean | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

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