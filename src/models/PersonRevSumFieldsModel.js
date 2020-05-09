import { PersonRevSumFieldsModelBase } from "./PersonRevSumFieldsModel.base"


/* A graphql query fragment builders for PersonRevSumFieldsModel */
export { selectFromPersonRevSumFields, personRevSumFieldsModelPrimitives, PersonRevSumFieldsModelSelector } from "./PersonRevSumFieldsModel.base"

/**
 * PersonRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const PersonRevSumFieldsModel = PersonRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
