import { kultur_variance_fieldsModelBase } from "./kultur_variance_fieldsModel.base"


/* A graphql query fragment builders for kultur_variance_fieldsModel */
export { selectFromkultur_variance_fields, kultur_variance_fieldsModelPrimitives, kultur_variance_fieldsModelSelector } from "./kultur_variance_fieldsModel.base"

/**
 * kultur_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const kultur_variance_fieldsModel = kultur_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
