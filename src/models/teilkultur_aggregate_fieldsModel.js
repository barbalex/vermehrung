import { teilkultur_aggregate_fieldsModelBase } from "./teilkultur_aggregate_fieldsModel.base"


/* A graphql query fragment builders for teilkultur_aggregate_fieldsModel */
export { selectFromteilkultur_aggregate_fields, teilkultur_aggregate_fieldsModelPrimitives, teilkultur_aggregate_fieldsModelSelector } from "./teilkultur_aggregate_fieldsModel.base"

/**
 * teilkultur_aggregate_fieldsModel
 *
 * aggregate fields of "teilkultur"
 */
export const teilkultur_aggregate_fieldsModel = teilkultur_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
