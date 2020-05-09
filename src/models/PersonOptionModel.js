import { PersonOptionModelBase } from "./PersonOptionModel.base"


/* A graphql query fragment builders for PersonOptionModel */
export { selectFromPersonOption, personOptionModelPrimitives, PersonOptionModelSelector } from "./PersonOptionModel.base"

/**
 * PersonOptionModel
 *
 * columns and relationships of "person_option"
 */
export const PersonOptionModel = PersonOptionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
