import { lieferung_rev_stddev_pop_fieldsModelBase } from "./lieferung_rev_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for lieferung_rev_stddev_pop_fieldsModel */
export { selectFromlieferung_rev_stddev_pop_fields, lieferung_rev_stddev_pop_fieldsModelPrimitives, lieferung_rev_stddev_pop_fieldsModelSelector } from "./lieferung_rev_stddev_pop_fieldsModel.base"

/**
 * lieferung_rev_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const lieferung_rev_stddev_pop_fieldsModel = lieferung_rev_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
