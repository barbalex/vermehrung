import { SpatialRefSysStddevSampFieldsModelBase } from "./SpatialRefSysStddevSampFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysStddevSampFieldsModel */
export { selectFromSpatialRefSysStddevSampFields, spatialRefSysStddevSampFieldsModelPrimitives, SpatialRefSysStddevSampFieldsModelSelector } from "./SpatialRefSysStddevSampFieldsModel.base"

/**
 * SpatialRefSysStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const SpatialRefSysStddevSampFieldsModel = SpatialRefSysStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
