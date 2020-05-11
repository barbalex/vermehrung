import { art_var_samp_fieldsModelBase } from "./art_var_samp_fieldsModel.base"


/* A graphql query fragment builders for art_var_samp_fieldsModel */
export { selectFromart_var_samp_fields, art_var_samp_fieldsModelPrimitives, art_var_samp_fieldsModelSelector } from "./art_var_samp_fieldsModel.base"

/**
 * art_var_samp_fieldsModel
 *
 * aggregate var_samp on columns
 */
export const art_var_samp_fieldsModel = art_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
