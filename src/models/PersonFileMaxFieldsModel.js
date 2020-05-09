import { PersonFileMaxFieldsModelBase } from "./PersonFileMaxFieldsModel.base"


/* A graphql query fragment builders for PersonFileMaxFieldsModel */
export { selectFromPersonFileMaxFields, personFileMaxFieldsModelPrimitives, PersonFileMaxFieldsModelSelector } from "./PersonFileMaxFieldsModel.base"

/**
 * PersonFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const PersonFileMaxFieldsModel = PersonFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
