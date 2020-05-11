import { kultur_aggregate_fieldsModelBase } from "./kultur_aggregate_fieldsModel.base"


/* A graphql query fragment builders for kultur_aggregate_fieldsModel */
export { selectFromkultur_aggregate_fields, kultur_aggregate_fieldsModelPrimitives, kultur_aggregate_fieldsModelSelector } from "./kultur_aggregate_fieldsModel.base"

/**
 * kultur_aggregate_fieldsModel
 *
 * aggregate fields of "kultur"
 */
export const kultur_aggregate_fieldsModel = kultur_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
