/** Identifier type for public.person_option_rev */
export type PersonOptionRevId = string & { __brand: 'public.person_option_rev' };

/** Represents the table public.person_option_rev */
export default interface PersonOptionRev {
  id: PersonOptionRevId;

  person_id: string;

  ar_name_deutsch: boolean | null;

  ga_strasse: boolean | null;

  ga_plz: boolean | null;

  ga_ort: boolean | null;

  ga_geom_point: boolean | null;

  ga_lat_lng: boolean | null;

  ga_aktiv: boolean | null;

  ga_bemerkungen: boolean | null;

  hk_kanton: boolean | null;

  hk_land: boolean | null;

  hk_bemerkungen: boolean | null;

  hk_geom_point: boolean | null;

  li_show_sl_felder: boolean | null;

  li_show_sl: boolean | null;

  sl_show_empty_when_next_to_li: boolean | null;

  sl_auto_copy_edits: boolean | null;

  tree_kultur: boolean | null;

  tree_teilkultur: boolean | null;

  tree_zaehlung: boolean | null;

  tree_lieferung: boolean | null;

  tree_event: boolean | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  changed: string | null;

  changed_by: string | null;

  ku_zwischenlager: boolean | null;

  ku_erhaltungskultur: boolean | null;

  _rev_at: number | null;

  art_qk_choosen: string[] | null;

  kultur_qk_choosen: string[] | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.person_option_rev */
export interface PersonOptionRevInitializer {
  /** Default value: uuidv7() */
  id?: PersonOptionRevId;

  person_id: string;

  /** Default value: true */
  ar_name_deutsch?: boolean | null;

  /** Default value: true */
  ga_strasse?: boolean | null;

  /** Default value: true */
  ga_plz?: boolean | null;

  /** Default value: true */
  ga_ort?: boolean | null;

  /** Default value: true */
  ga_geom_point?: boolean | null;

  /** Default value: true */
  ga_lat_lng?: boolean | null;

  /** Default value: true */
  ga_aktiv?: boolean | null;

  /** Default value: true */
  ga_bemerkungen?: boolean | null;

  /** Default value: true */
  hk_kanton?: boolean | null;

  /** Default value: true */
  hk_land?: boolean | null;

  /** Default value: true */
  hk_bemerkungen?: boolean | null;

  /** Default value: true */
  hk_geom_point?: boolean | null;

  /** Default value: false */
  li_show_sl_felder?: boolean | null;

  /** Default value: true */
  li_show_sl?: boolean | null;

  /** Default value: false */
  sl_show_empty_when_next_to_li?: boolean | null;

  /** Default value: true */
  sl_auto_copy_edits?: boolean | null;

  /** Default value: false */
  tree_kultur?: boolean | null;

  /** Default value: false */
  tree_teilkultur?: boolean | null;

  /** Default value: false */
  tree_zaehlung?: boolean | null;

  /** Default value: false */
  tree_lieferung?: boolean | null;

  /** Default value: false */
  tree_event?: boolean | null;

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

  /** Default value: false */
  ku_zwischenlager?: boolean | null;

  /** Default value: false */
  ku_erhaltungskultur?: boolean | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  art_qk_choosen?: string[] | null;

  kultur_qk_choosen?: string[] | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.person_option_rev */
export interface PersonOptionRevMutator {
  id?: PersonOptionRevId;

  person_id?: string;

  ar_name_deutsch?: boolean | null;

  ga_strasse?: boolean | null;

  ga_plz?: boolean | null;

  ga_ort?: boolean | null;

  ga_geom_point?: boolean | null;

  ga_lat_lng?: boolean | null;

  ga_aktiv?: boolean | null;

  ga_bemerkungen?: boolean | null;

  hk_kanton?: boolean | null;

  hk_land?: boolean | null;

  hk_bemerkungen?: boolean | null;

  hk_geom_point?: boolean | null;

  li_show_sl_felder?: boolean | null;

  li_show_sl?: boolean | null;

  sl_show_empty_when_next_to_li?: boolean | null;

  sl_auto_copy_edits?: boolean | null;

  tree_kultur?: boolean | null;

  tree_teilkultur?: boolean | null;

  tree_zaehlung?: boolean | null;

  tree_lieferung?: boolean | null;

  tree_event?: boolean | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  changed?: string | null;

  changed_by?: string | null;

  ku_zwischenlager?: boolean | null;

  ku_erhaltungskultur?: boolean | null;

  _rev_at?: number | null;

  art_qk_choosen?: string[] | null;

  kultur_qk_choosen?: string[] | null;

  old_id?: string | null;
}