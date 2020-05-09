import { PersonOptionMinFieldsModelBase } from "./PersonOptionMinFieldsModel.base"


/* A graphql query fragment builders for PersonOptionMinFieldsModel */
export { selectFromPersonOptionMinFields, personOptionMinFieldsModelPrimitives, PersonOptionMinFieldsModelSelector } from "./PersonOptionMinFieldsModel.base"

/**
 * PersonOptionMinFieldsModel
 *
 * aggregate min on columns
 */
export const PersonOptionMinFieldsModel = PersonOptionMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
