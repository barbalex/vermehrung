import { art_stddev_pop_fieldsModelBase } from "./art_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for art_stddev_pop_fieldsModel */
export { selectFromart_stddev_pop_fields, art_stddev_pop_fieldsModelPrimitives, art_stddev_pop_fieldsModelSelector } from "./art_stddev_pop_fieldsModel.base"

/**
 * art_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const art_stddev_pop_fieldsModel = art_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
