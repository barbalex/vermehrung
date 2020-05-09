import { SammelLieferungAggregateModelBase } from "./SammelLieferungAggregateModel.base"


/* A graphql query fragment builders for SammelLieferungAggregateModel */
export { selectFromSammelLieferungAggregate, sammelLieferungAggregateModelPrimitives, SammelLieferungAggregateModelSelector } from "./SammelLieferungAggregateModel.base"

/**
 * SammelLieferungAggregateModel
 *
 * aggregated selection of "sammel_lieferung"
 */
export const SammelLieferungAggregateModel = SammelLieferungAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
