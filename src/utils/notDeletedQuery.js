import { Q } from '@nozbe/watermelondb'

const notDeletedQuery = Q.where('_deleted', false)

export default notDeletedQuery
