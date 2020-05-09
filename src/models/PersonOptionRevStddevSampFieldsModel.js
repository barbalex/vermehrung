import { PersonOptionRevStddevSampFieldsModelBase } from "./PersonOptionRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevStddevSampFieldsModel */
export { selectFromPersonOptionRevStddevSampFields, personOptionRevStddevSampFieldsModelPrimitives, PersonOptionRevStddevSampFieldsModelSelector } from "./PersonOptionRevStddevSampFieldsModel.base"

/**
 * PersonOptionRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const PersonOptionRevStddevSampFieldsModel = PersonOptionRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
