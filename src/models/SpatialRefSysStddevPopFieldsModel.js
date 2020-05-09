import { SpatialRefSysStddevPopFieldsModelBase } from "./SpatialRefSysStddevPopFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysStddevPopFieldsModel */
export { selectFromSpatialRefSysStddevPopFields, spatialRefSysStddevPopFieldsModelPrimitives, SpatialRefSysStddevPopFieldsModelSelector } from "./SpatialRefSysStddevPopFieldsModel.base"

/**
 * SpatialRefSysStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const SpatialRefSysStddevPopFieldsModel = SpatialRefSysStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
