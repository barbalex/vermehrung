import { SammlungAggregateFieldsModelBase } from "./SammlungAggregateFieldsModel.base"


/* A graphql query fragment builders for SammlungAggregateFieldsModel */
export { selectFromSammlungAggregateFields, sammlungAggregateFieldsModelPrimitives, SammlungAggregateFieldsModelSelector } from "./SammlungAggregateFieldsModel.base"

/**
 * SammlungAggregateFieldsModel
 *
 * aggregate fields of "sammlung"
 */
export const SammlungAggregateFieldsModel = SammlungAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
