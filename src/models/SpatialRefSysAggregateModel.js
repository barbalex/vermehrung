import { SpatialRefSysAggregateModelBase } from "./SpatialRefSysAggregateModel.base"


/* A graphql query fragment builders for SpatialRefSysAggregateModel */
export { selectFromSpatialRefSysAggregate, spatialRefSysAggregateModelPrimitives, SpatialRefSysAggregateModelSelector } from "./SpatialRefSysAggregateModel.base"

/**
 * SpatialRefSysAggregateModel
 *
 * aggregated selection of "spatial_ref_sys"
 */
export const SpatialRefSysAggregateModel = SpatialRefSysAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
