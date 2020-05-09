import { KulturFileAggregateModelBase } from "./KulturFileAggregateModel.base"


/* A graphql query fragment builders for KulturFileAggregateModel */
export { selectFromKulturFileAggregate, kulturFileAggregateModelPrimitives, KulturFileAggregateModelSelector } from "./KulturFileAggregateModel.base"

/**
 * KulturFileAggregateModel
 *
 * aggregated selection of "kultur_file"
 */
export const KulturFileAggregateModel = KulturFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
