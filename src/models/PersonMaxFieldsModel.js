import { PersonMaxFieldsModelBase } from "./PersonMaxFieldsModel.base"


/* A graphql query fragment builders for PersonMaxFieldsModel */
export { selectFromPersonMaxFields, personMaxFieldsModelPrimitives, PersonMaxFieldsModelSelector } from "./PersonMaxFieldsModel.base"

/**
 * PersonMaxFieldsModel
 *
 * aggregate max on columns
 */
export const PersonMaxFieldsModel = PersonMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
