import { Q } from '@nozbe/watermelondb'

export const notDeletedQuery = Q.where('_deleted', false)
