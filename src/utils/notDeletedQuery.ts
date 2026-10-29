import { Q } from 'nitromelondb'

export const notDeletedQuery = Q.where('_deleted', false)
