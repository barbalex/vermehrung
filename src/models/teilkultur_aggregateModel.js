import { teilkultur_aggregateModelBase } from "./teilkultur_aggregateModel.base"


/* A graphql query fragment builders for teilkultur_aggregateModel */
export { selectFromteilkultur_aggregate, teilkultur_aggregateModelPrimitives, teilkultur_aggregateModelSelector } from "./teilkultur_aggregateModel.base"

/**
 * teilkultur_aggregateModel
 *
 * aggregated selection of "teilkultur"
 */
export const teilkultur_aggregateModel = teilkultur_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
