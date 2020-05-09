import { PersonOptionRevMaxFieldsModelBase } from "./PersonOptionRevMaxFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevMaxFieldsModel */
export { selectFromPersonOptionRevMaxFields, personOptionRevMaxFieldsModelPrimitives, PersonOptionRevMaxFieldsModelSelector } from "./PersonOptionRevMaxFieldsModel.base"

/**
 * PersonOptionRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const PersonOptionRevMaxFieldsModel = PersonOptionRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
