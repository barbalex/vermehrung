import { PersonStddevPopFieldsModelBase } from "./PersonStddevPopFieldsModel.base"


/* A graphql query fragment builders for PersonStddevPopFieldsModel */
export { selectFromPersonStddevPopFields, personStddevPopFieldsModelPrimitives, PersonStddevPopFieldsModelSelector } from "./PersonStddevPopFieldsModel.base"

/**
 * PersonStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const PersonStddevPopFieldsModel = PersonStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
