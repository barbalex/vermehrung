import { SammlungVarSampFieldsModelBase } from "./SammlungVarSampFieldsModel.base"


/* A graphql query fragment builders for SammlungVarSampFieldsModel */
export { selectFromSammlungVarSampFields, sammlungVarSampFieldsModelPrimitives, SammlungVarSampFieldsModelSelector } from "./SammlungVarSampFieldsModel.base"

/**
 * SammlungVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const SammlungVarSampFieldsModel = SammlungVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
