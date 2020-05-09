import { PersonStddevFieldsModelBase } from "./PersonStddevFieldsModel.base"


/* A graphql query fragment builders for PersonStddevFieldsModel */
export { selectFromPersonStddevFields, personStddevFieldsModelPrimitives, PersonStddevFieldsModelSelector } from "./PersonStddevFieldsModel.base"

/**
 * PersonStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const PersonStddevFieldsModel = PersonStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
