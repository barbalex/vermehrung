import { lieferung_sum_fieldsModelBase } from "./lieferung_sum_fieldsModel.base"


/* A graphql query fragment builders for lieferung_sum_fieldsModel */
export { selectFromlieferung_sum_fields, lieferung_sum_fieldsModelPrimitives, lieferung_sum_fieldsModelSelector } from "./lieferung_sum_fieldsModel.base"

/**
 * lieferung_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const lieferung_sum_fieldsModel = lieferung_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
