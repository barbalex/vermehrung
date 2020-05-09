import { SpatialRefSysSumFieldsModelBase } from "./SpatialRefSysSumFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysSumFieldsModel */
export { selectFromSpatialRefSysSumFields, spatialRefSysSumFieldsModelPrimitives, SpatialRefSysSumFieldsModelSelector } from "./SpatialRefSysSumFieldsModel.base"

/**
 * SpatialRefSysSumFieldsModel
 *
 * aggregate sum on columns
 */
export const SpatialRefSysSumFieldsModel = SpatialRefSysSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
