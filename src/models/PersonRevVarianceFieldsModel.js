import { PersonRevVarianceFieldsModelBase } from "./PersonRevVarianceFieldsModel.base"


/* A graphql query fragment builders for PersonRevVarianceFieldsModel */
export { selectFromPersonRevVarianceFields, personRevVarianceFieldsModelPrimitives, PersonRevVarianceFieldsModelSelector } from "./PersonRevVarianceFieldsModel.base"

/**
 * PersonRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const PersonRevVarianceFieldsModel = PersonRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
