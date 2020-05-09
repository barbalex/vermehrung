import { kultur_rev_sum_fieldsModelBase } from "./kultur_rev_sum_fieldsModel.base"


/* A graphql query fragment builders for kultur_rev_sum_fieldsModel */
export { selectFromkultur_rev_sum_fields, kultur_rev_sum_fieldsModelPrimitives, kultur_rev_sum_fieldsModelSelector } from "./kultur_rev_sum_fieldsModel.base"

/**
 * kultur_rev_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const kultur_rev_sum_fieldsModel = kultur_rev_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
