import { GartenVarSampFieldsModelBase } from "./GartenVarSampFieldsModel.base"


/* A graphql query fragment builders for GartenVarSampFieldsModel */
export { selectFromGartenVarSampFields, gartenVarSampFieldsModelPrimitives, GartenVarSampFieldsModelSelector } from "./GartenVarSampFieldsModel.base"

/**
 * GartenVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const GartenVarSampFieldsModel = GartenVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
