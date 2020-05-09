import { PersonRevStddevSampFieldsModelBase } from "./PersonRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for PersonRevStddevSampFieldsModel */
export { selectFromPersonRevStddevSampFields, personRevStddevSampFieldsModelPrimitives, PersonRevStddevSampFieldsModelSelector } from "./PersonRevStddevSampFieldsModel.base"

/**
 * PersonRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const PersonRevStddevSampFieldsModel = PersonRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
