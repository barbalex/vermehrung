import { LieferungFileAggregateModelBase } from "./LieferungFileAggregateModel.base"


/* A graphql query fragment builders for LieferungFileAggregateModel */
export { selectFromLieferungFileAggregate, lieferungFileAggregateModelPrimitives, LieferungFileAggregateModelSelector } from "./LieferungFileAggregateModel.base"

/**
 * LieferungFileAggregateModel
 *
 * aggregated selection of "lieferung_file"
 */
export const LieferungFileAggregateModel = LieferungFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
