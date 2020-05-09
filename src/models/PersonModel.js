import { PersonModelBase } from "./PersonModel.base"


/* A graphql query fragment builders for PersonModel */
export { selectFromPerson, personModelPrimitives, PersonModelSelector } from "./PersonModel.base"

/**
 * PersonModel
 *
 * columns and relationships of "person"
 */
export const PersonModel = PersonModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
