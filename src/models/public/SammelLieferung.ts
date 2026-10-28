import type { ArtId } from './Art.ts';
import type { PersonId } from './Person.ts';
import type { SammlungId } from './Sammlung.ts';
import type { KulturId } from './Kultur.ts';

/** Identifier type for public.sammel_lieferung */
export type SammelLieferungId = string & { __brand: 'public.sammel_lieferung' };

/** Represents the table public.sammel_lieferung */
export default interface SammelLieferung {
  id: SammelLieferungId;

  art_id: ArtId | null;

  person_id: PersonId | null;

  von_sammlung_id: SammlungId | null;

  von_kultur_id: KulturId | null;

  datum: string | null;

  nach_kultur_id: KulturId | null;

  nach_ausgepflanzt: boolean | null;

  von_anzahl_individuen: number | null;

  anzahl_pflanzen: number | null;

  anzahl_auspflanzbereit: number | null;

  gramm_samen: number | null;

  andere_menge: string | null;

  geplant: boolean | null;

  bemerkungen: string | null;

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

/** Represents the initializer for the table public.sammel_lieferung */
export interface SammelLieferungInitializer {
  /** Default value: uuidv7() */
  id?: SammelLieferungId;

  art_id?: ArtId | null;

  person_id?: PersonId | null;

  von_sammlung_id?: SammlungId | null;

  von_kultur_id?: KulturId | null;

  datum?: string | null;

  nach_kultur_id?: KulturId | null;

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

/** Represents the mutator for the table public.sammel_lieferung */
export interface SammelLieferungMutator {
  id?: SammelLieferungId;

  art_id?: ArtId | null;

  person_id?: PersonId | null;

  von_sammlung_id?: SammlungId | null;

  von_kultur_id?: KulturId | null;

  datum?: string | null;

  nach_kultur_id?: KulturId | null;

  nach_ausgepflanzt?: boolean | null;

  von_anzahl_individuen?: number | null;

  anzahl_pflanzen?: number | null;

  anzahl_auspflanzbereit?: number | null;

  gramm_samen?: number | null;

  andere_menge?: string | null;

  geplant?: boolean | null;

  bemerkungen?: string | null;

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