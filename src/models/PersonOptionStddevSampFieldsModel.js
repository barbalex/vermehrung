import { PersonOptionStddevSampFieldsModelBase } from "./PersonOptionStddevSampFieldsModel.base"


/* A graphql query fragment builders for PersonOptionStddevSampFieldsModel */
export { selectFromPersonOptionStddevSampFields, personOptionStddevSampFieldsModelPrimitives, PersonOptionStddevSampFieldsModelSelector } from "./PersonOptionStddevSampFieldsModel.base"

/**
 * PersonOptionStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const PersonOptionStddevSampFieldsModel = PersonOptionStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
