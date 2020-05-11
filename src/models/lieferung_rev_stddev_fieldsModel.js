import { lieferung_rev_stddev_fieldsModelBase } from "./lieferung_rev_stddev_fieldsModel.base"


/* A graphql query fragment builders for lieferung_rev_stddev_fieldsModel */
export { selectFromlieferung_rev_stddev_fields, lieferung_rev_stddev_fieldsModelPrimitives, lieferung_rev_stddev_fieldsModelSelector } from "./lieferung_rev_stddev_fieldsModel.base"

/**
 * lieferung_rev_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const lieferung_rev_stddev_fieldsModel = lieferung_rev_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
