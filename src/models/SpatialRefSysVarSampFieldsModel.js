import { SpatialRefSysVarSampFieldsModelBase } from "./SpatialRefSysVarSampFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysVarSampFieldsModel */
export { selectFromSpatialRefSysVarSampFields, spatialRefSysVarSampFieldsModelPrimitives, SpatialRefSysVarSampFieldsModelSelector } from "./SpatialRefSysVarSampFieldsModel.base"

/**
 * SpatialRefSysVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const SpatialRefSysVarSampFieldsModel = SpatialRefSysVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
