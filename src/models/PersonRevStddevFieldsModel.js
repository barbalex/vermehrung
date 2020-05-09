import { PersonRevStddevFieldsModelBase } from "./PersonRevStddevFieldsModel.base"


/* A graphql query fragment builders for PersonRevStddevFieldsModel */
export { selectFromPersonRevStddevFields, personRevStddevFieldsModelPrimitives, PersonRevStddevFieldsModelSelector } from "./PersonRevStddevFieldsModel.base"

/**
 * PersonRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const PersonRevStddevFieldsModel = PersonRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
