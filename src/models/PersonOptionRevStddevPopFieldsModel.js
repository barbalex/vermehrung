import { PersonOptionRevStddevPopFieldsModelBase } from "./PersonOptionRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevStddevPopFieldsModel */
export { selectFromPersonOptionRevStddevPopFields, personOptionRevStddevPopFieldsModelPrimitives, PersonOptionRevStddevPopFieldsModelSelector } from "./PersonOptionRevStddevPopFieldsModel.base"

/**
 * PersonOptionRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const PersonOptionRevStddevPopFieldsModel = PersonOptionRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
