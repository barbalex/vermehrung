/** Identifier type for public.person_rev */
export type PersonRevId = string & { __brand: 'public.person_rev' };

/** Represents the table public.person_rev */
export default interface PersonRev {
  id: PersonRevId;

  person_id: string;

  nr: string | null;

  name: string | null;

  adresszusatz: string | null;

  strasse: string | null;

  plz: number | null;

  ort: string | null;

  telefon_privat: string | null;

  telefon_geschaeft: string | null;

  telefon_mobile: string | null;

  email: string | null;

  kein_email: boolean | null;

  bemerkungen: string | null;

  changed: string | null;

  changed_by: string | null;

  account_id: string | null;

  kommerziell: boolean | null;

  info: boolean | null;

  aktiv: boolean | null;

  _rev: string;

  _parent_rev: string | null;

  _revisions: string[] | null;

  _depth: number | null;

  _deleted: boolean | null;

  vorname: string | null;

  _rev_at: number | null;

  user_role_id: string | null;

  old_id: string | null;
}

/** Represents the initializer for the table public.person_rev */
export interface PersonRevInitializer {
  /** Default value: uuidv7() */
  id?: PersonRevId;

  person_id: string;

  nr?: string | null;

  name?: string | null;

  adresszusatz?: string | null;

  strasse?: string | null;

  plz?: number | null;

  ort?: string | null;

  telefon_privat?: string | null;

  telefon_geschaeft?: string | null;

  telefon_mobile?: string | null;

  email?: string | null;

  /** Default value: false */
  kein_email?: boolean | null;

  bemerkungen?: string | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: NULL::character varying */
  changed_by?: string | null;

  account_id?: string | null;

  /** Default value: false */
  kommerziell?: boolean | null;

  /** Default value: false */
  info?: boolean | null;

  /** Default value: true */
  aktiv?: boolean | null;

  _rev: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  /** Default value: 1 */
  _depth?: number | null;

  /** Default value: false */
  _deleted?: boolean | null;

  vorname?: string | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;

  user_role_id?: string | null;

  old_id?: string | null;
}

/** Represents the mutator for the table public.person_rev */
export interface PersonRevMutator {
  id?: PersonRevId;

  person_id?: string;

  nr?: string | null;

  name?: string | null;

  adresszusatz?: string | null;

  strasse?: string | null;

  plz?: number | null;

  ort?: string | null;

  telefon_privat?: string | null;

  telefon_geschaeft?: string | null;

  telefon_mobile?: string | null;

  email?: string | null;

  kein_email?: boolean | null;

  bemerkungen?: string | null;

  changed?: string | null;

  changed_by?: string | null;

  account_id?: string | null;

  kommerziell?: boolean | null;

  info?: boolean | null;

  aktiv?: boolean | null;

  _rev?: string;

  _parent_rev?: string | null;

  _revisions?: string[] | null;

  _depth?: number | null;

  _deleted?: boolean | null;

  vorname?: string | null;

  _rev_at?: number | null;

  user_role_id?: string | null;

  old_id?: string | null;
}