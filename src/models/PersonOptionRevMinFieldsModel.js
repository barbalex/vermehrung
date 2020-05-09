import { PersonOptionRevMinFieldsModelBase } from "./PersonOptionRevMinFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevMinFieldsModel */
export { selectFromPersonOptionRevMinFields, personOptionRevMinFieldsModelPrimitives, PersonOptionRevMinFieldsModelSelector } from "./PersonOptionRevMinFieldsModel.base"

/**
 * PersonOptionRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const PersonOptionRevMinFieldsModel = PersonOptionRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
