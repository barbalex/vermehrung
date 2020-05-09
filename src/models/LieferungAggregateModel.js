import { LieferungAggregateModelBase } from "./LieferungAggregateModel.base"


/* A graphql query fragment builders for LieferungAggregateModel */
export { selectFromLieferungAggregate, lieferungAggregateModelPrimitives, LieferungAggregateModelSelector } from "./LieferungAggregateModel.base"

/**
 * LieferungAggregateModel
 *
 * aggregated selection of "lieferung"
 */
export const LieferungAggregateModel = LieferungAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
