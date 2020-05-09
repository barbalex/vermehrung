import { SammelLieferungRevAggregateModelBase } from "./SammelLieferungRevAggregateModel.base"


/* A graphql query fragment builders for SammelLieferungRevAggregateModel */
export { selectFromSammelLieferungRevAggregate, sammelLieferungRevAggregateModelPrimitives, SammelLieferungRevAggregateModelSelector } from "./SammelLieferungRevAggregateModel.base"

/**
 * SammelLieferungRevAggregateModel
 *
 * aggregated selection of "sammel_lieferung_rev"
 */
export const SammelLieferungRevAggregateModel = SammelLieferungRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
