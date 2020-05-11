import { kultur_stddev_fieldsModelBase } from "./kultur_stddev_fieldsModel.base"


/* A graphql query fragment builders for kultur_stddev_fieldsModel */
export { selectFromkultur_stddev_fields, kultur_stddev_fieldsModelPrimitives, kultur_stddev_fieldsModelSelector } from "./kultur_stddev_fieldsModel.base"

/**
 * kultur_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const kultur_stddev_fieldsModel = kultur_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
