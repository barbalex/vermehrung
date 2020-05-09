import { SpatialRefSysStddevFieldsModelBase } from "./SpatialRefSysStddevFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysStddevFieldsModel */
export { selectFromSpatialRefSysStddevFields, spatialRefSysStddevFieldsModelPrimitives, SpatialRefSysStddevFieldsModelSelector } from "./SpatialRefSysStddevFieldsModel.base"

/**
 * SpatialRefSysStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const SpatialRefSysStddevFieldsModel = SpatialRefSysStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
