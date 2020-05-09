import { SammlungFileAggregateFieldsModelBase } from "./SammlungFileAggregateFieldsModel.base"


/* A graphql query fragment builders for SammlungFileAggregateFieldsModel */
export { selectFromSammlungFileAggregateFields, sammlungFileAggregateFieldsModelPrimitives, SammlungFileAggregateFieldsModelSelector } from "./SammlungFileAggregateFieldsModel.base"

/**
 * SammlungFileAggregateFieldsModel
 *
 * aggregate fields of "sammlung_file"
 */
export const SammlungFileAggregateFieldsModel = SammlungFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
