import { PersonOptionStddevFieldsModelBase } from "./PersonOptionStddevFieldsModel.base"


/* A graphql query fragment builders for PersonOptionStddevFieldsModel */
export { selectFromPersonOptionStddevFields, personOptionStddevFieldsModelPrimitives, PersonOptionStddevFieldsModelSelector } from "./PersonOptionStddevFieldsModel.base"

/**
 * PersonOptionStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const PersonOptionStddevFieldsModel = PersonOptionStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
