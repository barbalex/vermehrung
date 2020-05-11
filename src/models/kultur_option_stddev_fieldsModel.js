import { kultur_option_stddev_fieldsModelBase } from "./kultur_option_stddev_fieldsModel.base"


/* A graphql query fragment builders for kultur_option_stddev_fieldsModel */
export { selectFromkultur_option_stddev_fields, kultur_option_stddev_fieldsModelPrimitives, kultur_option_stddev_fieldsModelSelector } from "./kultur_option_stddev_fieldsModel.base"

/**
 * kultur_option_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const kultur_option_stddev_fieldsModel = kultur_option_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
