import { PersonOptionRevStddevFieldsModelBase } from "./PersonOptionRevStddevFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevStddevFieldsModel */
export { selectFromPersonOptionRevStddevFields, personOptionRevStddevFieldsModelPrimitives, PersonOptionRevStddevFieldsModelSelector } from "./PersonOptionRevStddevFieldsModel.base"

/**
 * PersonOptionRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const PersonOptionRevStddevFieldsModel = PersonOptionRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
