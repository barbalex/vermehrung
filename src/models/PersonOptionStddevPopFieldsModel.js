import { PersonOptionStddevPopFieldsModelBase } from "./PersonOptionStddevPopFieldsModel.base"


/* A graphql query fragment builders for PersonOptionStddevPopFieldsModel */
export { selectFromPersonOptionStddevPopFields, personOptionStddevPopFieldsModelPrimitives, PersonOptionStddevPopFieldsModelSelector } from "./PersonOptionStddevPopFieldsModel.base"

/**
 * PersonOptionStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const PersonOptionStddevPopFieldsModel = PersonOptionStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
