import { lieferung_stddev_fieldsModelBase } from "./lieferung_stddev_fieldsModel.base"


/* A graphql query fragment builders for lieferung_stddev_fieldsModel */
export { selectFromlieferung_stddev_fields, lieferung_stddev_fieldsModelPrimitives, lieferung_stddev_fieldsModelSelector } from "./lieferung_stddev_fieldsModel.base"

/**
 * lieferung_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const lieferung_stddev_fieldsModel = lieferung_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
