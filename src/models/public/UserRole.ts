/** Identifier type for public.user_role */
export type UserRoleId = string & { __brand: 'public.user_role' };

/** Represents the table public.user_role */
export default interface UserRole {
  id: UserRoleId;

  name: string;

  sort: number | null;

  comment: string | null;

  label: string | null;

  changed: string | null;

  _rev_at: number | null;
}

/** Represents the initializer for the table public.user_role */
export interface UserRoleInitializer {
  /** Default value: uuid_generate_v1mc() */
  id?: UserRoleId;

  name: string;

  sort?: number | null;

  comment?: string | null;

  label?: string | null;

  /** Default value: now() */
  changed?: string | null;

  /** Default value: date_part('epoch'::text, timezone('utc'::text, now())) */
  _rev_at?: number | null;
}

/** Represents the mutator for the table public.user_role */
export interface UserRoleMutator {
  id?: UserRoleId;

  name?: string;

  sort?: number | null;

  comment?: string | null;

  label?: string | null;

  changed?: string | null;

  _rev_at?: number | null;
}