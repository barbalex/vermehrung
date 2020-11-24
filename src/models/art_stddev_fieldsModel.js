import { art_stddev_fieldsModelBase } from "./art_stddev_fieldsModel.base"


/* A graphql query fragment builders for art_stddev_fieldsModel */
export { selectFromart_stddev_fields, art_stddev_fieldsModelPrimitives, art_stddev_fieldsModelSelector } from "./art_stddev_fieldsModel.base"

/**
 * art_stddev_fieldsModel
 */
export const art_stddev_fieldsModel = art_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
