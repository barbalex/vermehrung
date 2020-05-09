import { PersonOptionVarianceFieldsModelBase } from "./PersonOptionVarianceFieldsModel.base"


/* A graphql query fragment builders for PersonOptionVarianceFieldsModel */
export { selectFromPersonOptionVarianceFields, personOptionVarianceFieldsModelPrimitives, PersonOptionVarianceFieldsModelSelector } from "./PersonOptionVarianceFieldsModel.base"

/**
 * PersonOptionVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const PersonOptionVarianceFieldsModel = PersonOptionVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
