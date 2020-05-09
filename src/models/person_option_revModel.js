import { person_option_revModelBase } from "./person_option_revModel.base"


/* A graphql query fragment builders for person_option_revModel */
export { selectFromperson_option_rev, person_option_revModelPrimitives, person_option_revModelSelector } from "./person_option_revModel.base"

/**
 * person_option_revModel
 *
 * columns and relationships of "person_option_rev"
 */
export const person_option_revModel = person_option_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
