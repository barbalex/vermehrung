import { SpatialRefSysVarPopFieldsModelBase } from "./SpatialRefSysVarPopFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysVarPopFieldsModel */
export { selectFromSpatialRefSysVarPopFields, spatialRefSysVarPopFieldsModelPrimitives, SpatialRefSysVarPopFieldsModelSelector } from "./SpatialRefSysVarPopFieldsModel.base"

/**
 * SpatialRefSysVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const SpatialRefSysVarPopFieldsModel = SpatialRefSysVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
