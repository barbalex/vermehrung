import { GartenFileAggregateFieldsModelBase } from "./GartenFileAggregateFieldsModel.base"


/* A graphql query fragment builders for GartenFileAggregateFieldsModel */
export { selectFromGartenFileAggregateFields, gartenFileAggregateFieldsModelPrimitives, GartenFileAggregateFieldsModelSelector } from "./GartenFileAggregateFieldsModel.base"

/**
 * GartenFileAggregateFieldsModel
 *
 * aggregate fields of "garten_file"
 */
export const GartenFileAggregateFieldsModel = GartenFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
