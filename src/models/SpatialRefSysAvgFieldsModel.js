import { SpatialRefSysAvgFieldsModelBase } from "./SpatialRefSysAvgFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysAvgFieldsModel */
export { selectFromSpatialRefSysAvgFields, spatialRefSysAvgFieldsModelPrimitives, SpatialRefSysAvgFieldsModelSelector } from "./SpatialRefSysAvgFieldsModel.base"

/**
 * SpatialRefSysAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const SpatialRefSysAvgFieldsModel = SpatialRefSysAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
