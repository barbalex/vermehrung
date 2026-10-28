/** Identifier type for public.ae_art */
export type AeArtId = string & { __brand: 'public.ae_art' };

/** Represents the table public.ae_art */
export default interface AeArt {
  id: AeArtId;

  name: string | null;

  name_deutsch: string | null;

  name_latein: string | null;

  changed: string | null;

  _rev_at: number | null;

  taxonomy: string | null;

  synonym: string | null;
}

/** Represents the initializer for the table public.ae_art */
export interface AeArtInitializer {
  id: AeArtId;

  name?: string | null;

  name_deutsch?: string | null;

  name_latein?: string | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: date_part('epoch'::text, now()) */
  _rev_at?: number | null;

  taxonomy?: string | null;

  synonym?: string | null;
}

/** Represents the mutator for the table public.ae_art */
export interface AeArtMutator {
  id?: AeArtId;

  name?: string | null;

  name_deutsch?: string | null;

  name_latein?: string | null;

  changed?: string | null;

  _rev_at?: number | null;

  taxonomy?: string | null;

  synonym?: string | null;
}