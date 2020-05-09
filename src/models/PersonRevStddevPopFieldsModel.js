import { PersonRevStddevPopFieldsModelBase } from "./PersonRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for PersonRevStddevPopFieldsModel */
export { selectFromPersonRevStddevPopFields, personRevStddevPopFieldsModelPrimitives, PersonRevStddevPopFieldsModelSelector } from "./PersonRevStddevPopFieldsModel.base"

/**
 * PersonRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const PersonRevStddevPopFieldsModel = PersonRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
