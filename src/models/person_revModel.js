import { person_revModelBase } from "./person_revModel.base"


/* A graphql query fragment builders for person_revModel */
export { selectFromperson_rev, person_revModelPrimitives, person_revModelSelector } from "./person_revModel.base"

/**
 * person_revModel
 *
 * columns and relationships of "person_rev"
 */
export const person_revModel = person_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
