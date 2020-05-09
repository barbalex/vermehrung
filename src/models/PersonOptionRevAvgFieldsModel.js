import { PersonOptionRevAvgFieldsModelBase } from "./PersonOptionRevAvgFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevAvgFieldsModel */
export { selectFromPersonOptionRevAvgFields, personOptionRevAvgFieldsModelPrimitives, PersonOptionRevAvgFieldsModelSelector } from "./PersonOptionRevAvgFieldsModel.base"

/**
 * PersonOptionRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const PersonOptionRevAvgFieldsModel = PersonOptionRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
