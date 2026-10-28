import type { ArtId } from './Art.ts';
import type { HerkunftId } from './Herkunft.ts';
import type { GartenId } from './Garten.ts';

/** Identifier type for public.kultur */
export type KulturId = string & { __brand: 'public.kultur' };

/** Represents the table public.kultur */
export default interface Kultur {
  id: KulturId;

  art_id: ArtId | null;

  herkunft_id: HerkunftId | null;

  garten_id: GartenId | null;

  zwischenlager: boolean | null;

  erhaltungskultur: boolean | null;

  von_anzahl_individuen: number | null;

  bemerkungen: string | null;

  aktiv: boolean | null;

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

/** Represents the initializer for the table public.kultur */
export interface KulturInitializer {
  /** Default value: uuidv7() */
  id?: KulturId;

  art_id?: ArtId | null;

  herkunft_id?: HerkunftId | null;

  garten_id?: GartenId | null;

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

/** Represents the mutator for the table public.kultur */
export interface KulturMutator {
  id?: KulturId;

  art_id?: ArtId | null;

  herkunft_id?: HerkunftId | null;

  garten_id?: GartenId | null;

  zwischenlager?: boolean | null;

  erhaltungskultur?: boolean | null;

  von_anzahl_individuen?: number | null;

  bemerkungen?: string | null;

  aktiv?: boolean | null;

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