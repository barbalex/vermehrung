import { GartenRevAggregateFieldsModelBase } from "./GartenRevAggregateFieldsModel.base"


/* A graphql query fragment builders for GartenRevAggregateFieldsModel */
export { selectFromGartenRevAggregateFields, gartenRevAggregateFieldsModelPrimitives, GartenRevAggregateFieldsModelSelector } from "./GartenRevAggregateFieldsModel.base"

/**
 * GartenRevAggregateFieldsModel
 *
 * aggregate fields of "garten_rev"
 */
export const GartenRevAggregateFieldsModel = GartenRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
