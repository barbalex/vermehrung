import { PersonSumFieldsModelBase } from "./PersonSumFieldsModel.base"


/* A graphql query fragment builders for PersonSumFieldsModel */
export { selectFromPersonSumFields, personSumFieldsModelPrimitives, PersonSumFieldsModelSelector } from "./PersonSumFieldsModel.base"

/**
 * PersonSumFieldsModel
 *
 * aggregate sum on columns
 */
export const PersonSumFieldsModel = PersonSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
