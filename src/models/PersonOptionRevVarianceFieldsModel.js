import { PersonOptionRevVarianceFieldsModelBase } from "./PersonOptionRevVarianceFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevVarianceFieldsModel */
export { selectFromPersonOptionRevVarianceFields, personOptionRevVarianceFieldsModelPrimitives, PersonOptionRevVarianceFieldsModelSelector } from "./PersonOptionRevVarianceFieldsModel.base"

/**
 * PersonOptionRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const PersonOptionRevVarianceFieldsModel = PersonOptionRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
