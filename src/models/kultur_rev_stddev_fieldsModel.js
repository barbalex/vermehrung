import { kultur_rev_stddev_fieldsModelBase } from "./kultur_rev_stddev_fieldsModel.base"


/* A graphql query fragment builders for kultur_rev_stddev_fieldsModel */
export { selectFromkultur_rev_stddev_fields, kultur_rev_stddev_fieldsModelPrimitives, kultur_rev_stddev_fieldsModelSelector } from "./kultur_rev_stddev_fieldsModel.base"

/**
 * kultur_rev_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const kultur_rev_stddev_fieldsModel = kultur_rev_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
