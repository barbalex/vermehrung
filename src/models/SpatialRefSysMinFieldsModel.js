import { SpatialRefSysMinFieldsModelBase } from "./SpatialRefSysMinFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysMinFieldsModel */
export { selectFromSpatialRefSysMinFields, spatialRefSysMinFieldsModelPrimitives, SpatialRefSysMinFieldsModelSelector } from "./SpatialRefSysMinFieldsModel.base"

/**
 * SpatialRefSysMinFieldsModel
 *
 * aggregate min on columns
 */
export const SpatialRefSysMinFieldsModel = SpatialRefSysMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
