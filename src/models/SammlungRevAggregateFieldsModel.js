import { SammlungRevAggregateFieldsModelBase } from "./SammlungRevAggregateFieldsModel.base"


/* A graphql query fragment builders for SammlungRevAggregateFieldsModel */
export { selectFromSammlungRevAggregateFields, sammlungRevAggregateFieldsModelPrimitives, SammlungRevAggregateFieldsModelSelector } from "./SammlungRevAggregateFieldsModel.base"

/**
 * SammlungRevAggregateFieldsModel
 *
 * aggregate fields of "sammlung_rev"
 */
export const SammlungRevAggregateFieldsModel = SammlungRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
