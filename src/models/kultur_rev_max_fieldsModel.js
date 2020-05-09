import { kultur_rev_max_fieldsModelBase } from "./kultur_rev_max_fieldsModel.base"


/* A graphql query fragment builders for kultur_rev_max_fieldsModel */
export { selectFromkultur_rev_max_fields, kultur_rev_max_fieldsModelPrimitives, kultur_rev_max_fieldsModelSelector } from "./kultur_rev_max_fieldsModel.base"

/**
 * kultur_rev_max_fieldsModel
 *
 * aggregate max on columns
 */
export const kultur_rev_max_fieldsModel = kultur_rev_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
