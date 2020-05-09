import { PersonRevAvgFieldsModelBase } from "./PersonRevAvgFieldsModel.base"


/* A graphql query fragment builders for PersonRevAvgFieldsModel */
export { selectFromPersonRevAvgFields, personRevAvgFieldsModelPrimitives, PersonRevAvgFieldsModelSelector } from "./PersonRevAvgFieldsModel.base"

/**
 * PersonRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const PersonRevAvgFieldsModel = PersonRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
