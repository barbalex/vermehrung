import { SammlungRevVarSampFieldsModelBase } from "./SammlungRevVarSampFieldsModel.base"


/* A graphql query fragment builders for SammlungRevVarSampFieldsModel */
export { selectFromSammlungRevVarSampFields, sammlungRevVarSampFieldsModelPrimitives, SammlungRevVarSampFieldsModelSelector } from "./SammlungRevVarSampFieldsModel.base"

/**
 * SammlungRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const SammlungRevVarSampFieldsModel = SammlungRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
