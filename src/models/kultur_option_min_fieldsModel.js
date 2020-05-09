import { kultur_option_min_fieldsModelBase } from "./kultur_option_min_fieldsModel.base"


/* A graphql query fragment builders for kultur_option_min_fieldsModel */
export { selectFromkultur_option_min_fields, kultur_option_min_fieldsModelPrimitives, kultur_option_min_fieldsModelSelector } from "./kultur_option_min_fieldsModel.base"

/**
 * kultur_option_min_fieldsModel
 *
 * aggregate min on columns
 */
export const kultur_option_min_fieldsModel = kultur_option_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
