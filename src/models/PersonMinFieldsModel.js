import { PersonMinFieldsModelBase } from "./PersonMinFieldsModel.base"


/* A graphql query fragment builders for PersonMinFieldsModel */
export { selectFromPersonMinFields, personMinFieldsModelPrimitives, PersonMinFieldsModelSelector } from "./PersonMinFieldsModel.base"

/**
 * PersonMinFieldsModel
 *
 * aggregate min on columns
 */
export const PersonMinFieldsModel = PersonMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
