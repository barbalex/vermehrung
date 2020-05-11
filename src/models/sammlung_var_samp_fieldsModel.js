import { sammlung_var_samp_fieldsModelBase } from "./sammlung_var_samp_fieldsModel.base"


/* A graphql query fragment builders for sammlung_var_samp_fieldsModel */
export { selectFromsammlung_var_samp_fields, sammlung_var_samp_fieldsModelPrimitives, sammlung_var_samp_fieldsModelSelector } from "./sammlung_var_samp_fieldsModel.base"

/**
 * sammlung_var_samp_fieldsModel
 *
 * aggregate var_samp on columns
 */
export const sammlung_var_samp_fieldsModel = sammlung_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
