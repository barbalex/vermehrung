import { GartenAggregateFieldsModelBase } from "./GartenAggregateFieldsModel.base"


/* A graphql query fragment builders for GartenAggregateFieldsModel */
export { selectFromGartenAggregateFields, gartenAggregateFieldsModelPrimitives, GartenAggregateFieldsModelSelector } from "./GartenAggregateFieldsModel.base"

/**
 * GartenAggregateFieldsModel
 *
 * aggregate fields of "garten"
 */
export const GartenAggregateFieldsModel = GartenAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
