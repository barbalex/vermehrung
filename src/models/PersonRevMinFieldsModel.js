import { PersonRevMinFieldsModelBase } from "./PersonRevMinFieldsModel.base"


/* A graphql query fragment builders for PersonRevMinFieldsModel */
export { selectFromPersonRevMinFields, personRevMinFieldsModelPrimitives, PersonRevMinFieldsModelSelector } from "./PersonRevMinFieldsModel.base"

/**
 * PersonRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const PersonRevMinFieldsModel = PersonRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
