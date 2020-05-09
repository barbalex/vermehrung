import { ZaehlungVarSampFieldsModelBase } from "./ZaehlungVarSampFieldsModel.base"


/* A graphql query fragment builders for ZaehlungVarSampFieldsModel */
export { selectFromZaehlungVarSampFields, zaehlungVarSampFieldsModelPrimitives, ZaehlungVarSampFieldsModelSelector } from "./ZaehlungVarSampFieldsModel.base"

/**
 * ZaehlungVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const ZaehlungVarSampFieldsModel = ZaehlungVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
