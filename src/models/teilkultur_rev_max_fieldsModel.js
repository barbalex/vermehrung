import { teilkultur_rev_max_fieldsModelBase } from "./teilkultur_rev_max_fieldsModel.base"


/* A graphql query fragment builders for teilkultur_rev_max_fieldsModel */
export { selectFromteilkultur_rev_max_fields, teilkultur_rev_max_fieldsModelPrimitives, teilkultur_rev_max_fieldsModelSelector } from "./teilkultur_rev_max_fieldsModel.base"

/**
 * teilkultur_rev_max_fieldsModel
 *
 * aggregate max on columns
 */
export const teilkultur_rev_max_fieldsModel = teilkultur_rev_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
