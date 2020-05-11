import { person_option_stddev_samp_fieldsModelBase } from "./person_option_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for person_option_stddev_samp_fieldsModel */
export { selectFromperson_option_stddev_samp_fields, person_option_stddev_samp_fieldsModelPrimitives, person_option_stddev_samp_fieldsModelSelector } from "./person_option_stddev_samp_fieldsModel.base"

/**
 * person_option_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const person_option_stddev_samp_fieldsModel = person_option_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
