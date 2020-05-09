import { SpatialRefSysVarianceFieldsModelBase } from "./SpatialRefSysVarianceFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysVarianceFieldsModel */
export { selectFromSpatialRefSysVarianceFields, spatialRefSysVarianceFieldsModelPrimitives, SpatialRefSysVarianceFieldsModelSelector } from "./SpatialRefSysVarianceFieldsModel.base"

/**
 * SpatialRefSysVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const SpatialRefSysVarianceFieldsModel = SpatialRefSysVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
