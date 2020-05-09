import { KulturQkAggregateModelBase } from "./KulturQkAggregateModel.base"


/* A graphql query fragment builders for KulturQkAggregateModel */
export { selectFromKulturQkAggregate, kulturQkAggregateModelPrimitives, KulturQkAggregateModelSelector } from "./KulturQkAggregateModel.base"

/**
 * KulturQkAggregateModel
 *
 * aggregated selection of "kultur_qk"
 */
export const KulturQkAggregateModel = KulturQkAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
