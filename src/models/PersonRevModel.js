import { PersonRevModelBase } from "./PersonRevModel.base"


/* A graphql query fragment builders for PersonRevModel */
export { selectFromPersonRev, personRevModelPrimitives, PersonRevModelSelector } from "./PersonRevModel.base"

/**
 * PersonRevModel
 *
 * columns and relationships of "person_rev"
 */
export const PersonRevModel = PersonRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
