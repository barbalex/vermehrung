import { PersonRevMaxFieldsModelBase } from "./PersonRevMaxFieldsModel.base"


/* A graphql query fragment builders for PersonRevMaxFieldsModel */
export { selectFromPersonRevMaxFields, personRevMaxFieldsModelPrimitives, PersonRevMaxFieldsModelSelector } from "./PersonRevMaxFieldsModel.base"

/**
 * PersonRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const PersonRevMaxFieldsModel = PersonRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
