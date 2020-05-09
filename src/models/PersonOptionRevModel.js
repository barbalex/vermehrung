import { PersonOptionRevModelBase } from "./PersonOptionRevModel.base"


/* A graphql query fragment builders for PersonOptionRevModel */
export { selectFromPersonOptionRev, personOptionRevModelPrimitives, PersonOptionRevModelSelector } from "./PersonOptionRevModel.base"

/**
 * PersonOptionRevModel
 *
 * columns and relationships of "person_option_rev"
 */
export const PersonOptionRevModel = PersonOptionRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
