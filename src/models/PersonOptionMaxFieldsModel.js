import { PersonOptionMaxFieldsModelBase } from "./PersonOptionMaxFieldsModel.base"


/* A graphql query fragment builders for PersonOptionMaxFieldsModel */
export { selectFromPersonOptionMaxFields, personOptionMaxFieldsModelPrimitives, PersonOptionMaxFieldsModelSelector } from "./PersonOptionMaxFieldsModel.base"

/**
 * PersonOptionMaxFieldsModel
 *
 * aggregate max on columns
 */
export const PersonOptionMaxFieldsModel = PersonOptionMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
