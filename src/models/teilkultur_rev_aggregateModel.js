import { teilkultur_rev_aggregateModelBase } from "./teilkultur_rev_aggregateModel.base"


/* A graphql query fragment builders for teilkultur_rev_aggregateModel */
export { selectFromteilkultur_rev_aggregate, teilkultur_rev_aggregateModelPrimitives, teilkultur_rev_aggregateModelSelector } from "./teilkultur_rev_aggregateModel.base"

/**
 * teilkultur_rev_aggregateModel
 *
 * aggregated selection of "teilkultur_rev"
 */
export const teilkultur_rev_aggregateModel = teilkultur_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
