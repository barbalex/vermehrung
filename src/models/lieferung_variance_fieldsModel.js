import { lieferung_variance_fieldsModelBase } from "./lieferung_variance_fieldsModel.base"


/* A graphql query fragment builders for lieferung_variance_fieldsModel */
export { selectFromlieferung_variance_fields, lieferung_variance_fieldsModelPrimitives, lieferung_variance_fieldsModelSelector } from "./lieferung_variance_fieldsModel.base"

/**
 * lieferung_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const lieferung_variance_fieldsModel = lieferung_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
