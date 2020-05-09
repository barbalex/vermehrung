import { LieferungRevAggregateModelBase } from "./LieferungRevAggregateModel.base"


/* A graphql query fragment builders for LieferungRevAggregateModel */
export { selectFromLieferungRevAggregate, lieferungRevAggregateModelPrimitives, LieferungRevAggregateModelSelector } from "./LieferungRevAggregateModel.base"

/**
 * LieferungRevAggregateModel
 *
 * aggregated selection of "lieferung_rev"
 */
export const LieferungRevAggregateModel = LieferungRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
