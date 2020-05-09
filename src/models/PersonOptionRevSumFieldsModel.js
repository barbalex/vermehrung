import { PersonOptionRevSumFieldsModelBase } from "./PersonOptionRevSumFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevSumFieldsModel */
export { selectFromPersonOptionRevSumFields, personOptionRevSumFieldsModelPrimitives, PersonOptionRevSumFieldsModelSelector } from "./PersonOptionRevSumFieldsModel.base"

/**
 * PersonOptionRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const PersonOptionRevSumFieldsModel = PersonOptionRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
