import { PersonFileMinFieldsModelBase } from "./PersonFileMinFieldsModel.base"


/* A graphql query fragment builders for PersonFileMinFieldsModel */
export { selectFromPersonFileMinFields, personFileMinFieldsModelPrimitives, PersonFileMinFieldsModelSelector } from "./PersonFileMinFieldsModel.base"

/**
 * PersonFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const PersonFileMinFieldsModel = PersonFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
