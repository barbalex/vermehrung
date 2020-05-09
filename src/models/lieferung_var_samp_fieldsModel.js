import { lieferung_var_samp_fieldsModelBase } from "./lieferung_var_samp_fieldsModel.base"


/* A graphql query fragment builders for lieferung_var_samp_fieldsModel */
export { selectFromlieferung_var_samp_fields, lieferung_var_samp_fieldsModelPrimitives, lieferung_var_samp_fieldsModelSelector } from "./lieferung_var_samp_fieldsModel.base"

/**
 * lieferung_var_samp_fieldsModel
 *
 * aggregate var_samp on columns
 */
export const lieferung_var_samp_fieldsModel = lieferung_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
