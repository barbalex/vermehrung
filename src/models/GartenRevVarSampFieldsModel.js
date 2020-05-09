import { GartenRevVarSampFieldsModelBase } from "./GartenRevVarSampFieldsModel.base"


/* A graphql query fragment builders for GartenRevVarSampFieldsModel */
export { selectFromGartenRevVarSampFields, gartenRevVarSampFieldsModelPrimitives, GartenRevVarSampFieldsModelSelector } from "./GartenRevVarSampFieldsModel.base"

/**
 * GartenRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const GartenRevVarSampFieldsModel = GartenRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
