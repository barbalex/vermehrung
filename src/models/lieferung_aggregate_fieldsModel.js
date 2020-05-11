import { lieferung_aggregate_fieldsModelBase } from "./lieferung_aggregate_fieldsModel.base"


/* A graphql query fragment builders for lieferung_aggregate_fieldsModel */
export { selectFromlieferung_aggregate_fields, lieferung_aggregate_fieldsModelPrimitives, lieferung_aggregate_fieldsModelSelector } from "./lieferung_aggregate_fieldsModel.base"

/**
 * lieferung_aggregate_fieldsModel
 *
 * aggregate fields of "lieferung"
 */
export const lieferung_aggregate_fieldsModel = lieferung_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
