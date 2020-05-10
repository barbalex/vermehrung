import { RootStoreBase } from './RootStore.base'
import { v1 as uuidv1 } from 'uuid'

export const RootStore = RootStoreBase.actions((self) => ({
  addPerson() {
    const id = uuidv1()
    const newPerson = { id }
    return self.mutateInsert_person(
      {
        objects: [newPerson],
        on_conflict: { constraint: 'person_pkey', update_columns: [] },
      },
      undefined,
      () => {
        self.persons = { newPerson, ...self.persons.toJS() }
      },
    )
  },
}))
