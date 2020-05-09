import { PersonOptionAvgFieldsModelBase } from "./PersonOptionAvgFieldsModel.base"


/* A graphql query fragment builders for PersonOptionAvgFieldsModel */
export { selectFromPersonOptionAvgFields, personOptionAvgFieldsModelPrimitives, PersonOptionAvgFieldsModelSelector } from "./PersonOptionAvgFieldsModel.base"

/**
 * PersonOptionAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const PersonOptionAvgFieldsModel = PersonOptionAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
