import { SpatialRefSysMaxFieldsModelBase } from "./SpatialRefSysMaxFieldsModel.base"


/* A graphql query fragment builders for SpatialRefSysMaxFieldsModel */
export { selectFromSpatialRefSysMaxFields, spatialRefSysMaxFieldsModelPrimitives, SpatialRefSysMaxFieldsModelSelector } from "./SpatialRefSysMaxFieldsModel.base"

/**
 * SpatialRefSysMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SpatialRefSysMaxFieldsModel = SpatialRefSysMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
