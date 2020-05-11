import { sammlung_rev_sum_fieldsModelBase } from "./sammlung_rev_sum_fieldsModel.base"


/* A graphql query fragment builders for sammlung_rev_sum_fieldsModel */
export { selectFromsammlung_rev_sum_fields, sammlung_rev_sum_fieldsModelPrimitives, sammlung_rev_sum_fieldsModelSelector } from "./sammlung_rev_sum_fieldsModel.base"

/**
 * sammlung_rev_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const sammlung_rev_sum_fieldsModel = sammlung_rev_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
