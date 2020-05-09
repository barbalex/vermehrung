import { PersonOptionSumFieldsModelBase } from "./PersonOptionSumFieldsModel.base"


/* A graphql query fragment builders for PersonOptionSumFieldsModel */
export { selectFromPersonOptionSumFields, personOptionSumFieldsModelPrimitives, PersonOptionSumFieldsModelSelector } from "./PersonOptionSumFieldsModel.base"

/**
 * PersonOptionSumFieldsModel
 *
 * aggregate sum on columns
 */
export const PersonOptionSumFieldsModel = PersonOptionSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
