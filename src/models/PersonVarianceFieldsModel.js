import { PersonVarianceFieldsModelBase } from "./PersonVarianceFieldsModel.base"


/* A graphql query fragment builders for PersonVarianceFieldsModel */
export { selectFromPersonVarianceFields, personVarianceFieldsModelPrimitives, PersonVarianceFieldsModelSelector } from "./PersonVarianceFieldsModel.base"

/**
 * PersonVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const PersonVarianceFieldsModel = PersonVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
