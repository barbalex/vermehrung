import { kultur_rev_min_fieldsModelBase } from "./kultur_rev_min_fieldsModel.base"


/* A graphql query fragment builders for kultur_rev_min_fieldsModel */
export { selectFromkultur_rev_min_fields, kultur_rev_min_fieldsModelPrimitives, kultur_rev_min_fieldsModelSelector } from "./kultur_rev_min_fieldsModel.base"

/**
 * kultur_rev_min_fieldsModel
 *
 * aggregate min on columns
 */
export const kultur_rev_min_fieldsModel = kultur_rev_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
