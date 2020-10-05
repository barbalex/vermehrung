import { garten_stddev_fieldsModelBase } from "./garten_stddev_fieldsModel.base"


/* A graphql query fragment builders for garten_stddev_fieldsModel */
export { selectFromgarten_stddev_fields, garten_stddev_fieldsModelPrimitives, garten_stddev_fieldsModelSelector } from "./garten_stddev_fieldsModel.base"

/**
 * garten_stddev_fieldsModel
 */
export const garten_stddev_fieldsModel = garten_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
