import { gv_stddev_fieldsModelBase } from "./gv_stddev_fieldsModel.base"


/* A graphql query fragment builders for gv_stddev_fieldsModel */
export { selectFromgv_stddev_fields, gv_stddev_fieldsModelPrimitives, gv_stddev_fieldsModelSelector } from "./gv_stddev_fieldsModel.base"

/**
 * gv_stddev_fieldsModel
 */
export const gv_stddev_fieldsModel = gv_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
