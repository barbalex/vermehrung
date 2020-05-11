import { garten_rev_stddev_pop_fieldsModelBase } from "./garten_rev_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for garten_rev_stddev_pop_fieldsModel */
export { selectFromgarten_rev_stddev_pop_fields, garten_rev_stddev_pop_fieldsModelPrimitives, garten_rev_stddev_pop_fieldsModelSelector } from "./garten_rev_stddev_pop_fieldsModel.base"

/**
 * garten_rev_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const garten_rev_stddev_pop_fieldsModel = garten_rev_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
