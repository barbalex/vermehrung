import { PersonStddevSampFieldsModelBase } from "./PersonStddevSampFieldsModel.base"


/* A graphql query fragment builders for PersonStddevSampFieldsModel */
export { selectFromPersonStddevSampFields, personStddevSampFieldsModelPrimitives, PersonStddevSampFieldsModelSelector } from "./PersonStddevSampFieldsModel.base"

/**
 * PersonStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const PersonStddevSampFieldsModel = PersonStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
