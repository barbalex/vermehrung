import { PersonAvgFieldsModelBase } from "./PersonAvgFieldsModel.base"


/* A graphql query fragment builders for PersonAvgFieldsModel */
export { selectFromPersonAvgFields, personAvgFieldsModelPrimitives, PersonAvgFieldsModelSelector } from "./PersonAvgFieldsModel.base"

/**
 * PersonAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const PersonAvgFieldsModel = PersonAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
