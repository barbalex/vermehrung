import { kultur_file_min_fieldsModelBase } from "./kultur_file_min_fieldsModel.base"


/* A graphql query fragment builders for kultur_file_min_fieldsModel */
export { selectFromkultur_file_min_fields, kultur_file_min_fieldsModelPrimitives, kultur_file_min_fieldsModelSelector } from "./kultur_file_min_fieldsModel.base"

/**
 * kultur_file_min_fieldsModel
 *
 * aggregate min on columns
 */
export const kultur_file_min_fieldsModel = kultur_file_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
