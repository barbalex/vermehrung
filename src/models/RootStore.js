import { RootStoreBase } from './RootStore.base'
import { v1 as uuidv1 } from 'uuid'

export const RootStore = RootStoreBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  },
  addPerson() {
    const id = uuidv1()
    self.mutateInsert_person({
      objects: [{ id, name: 'test' }],
      onConflict: { constraint: 'person_pkey', update_columns: [] },
    })
  },
}))
