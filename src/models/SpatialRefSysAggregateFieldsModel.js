import { SpatialRefSysAggregateFieldsModelBase } from "./SpatialRefSysAggregateFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysAggregateFieldsModel */
export { selectFromSpatialRefSysAggregateFields, spatialRefSysAggregateFieldsModelPrimitives, SpatialRefSysAggregateFieldsModelSelector } from "./SpatialRefSysAggregateFieldsModel.base"

/**
 * SpatialRefSysAggregateFieldsModel
 *
 * aggregate fields of "spatial_ref_sys"
 */
export const SpatialRefSysAggregateFieldsModel = SpatialRefSysAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
