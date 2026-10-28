/** Identifier type for public.apflora_ap */
export type ApfloraApId = string & { __brand: 'public.apflora_ap' };

/** Represents the table public.apflora_ap */
export default interface ApfloraAp {
  id: ApfloraApId;

  ae_id: string | null;

  av: string | null;

  ap: boolean | null;
}

/** Represents the initializer for the table public.apflora_ap */
export interface ApfloraApInitializer {
  /** Default value: gen_random_uuid() */
  id?: ApfloraApId;

  ae_id?: string | null;

  av?: string | null;

  ap?: boolean | null;
}

/** Represents the mutator for the table public.apflora_ap */
export interface ApfloraApMutator {
  id?: ApfloraApId;

  ae_id?: string | null;

  av?: string | null;

  ap?: boolean | null;
}