import { ZaehlungRevVarSampFieldsModelBase } from "./ZaehlungRevVarSampFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevVarSampFieldsModel */
export { selectFromZaehlungRevVarSampFields, zaehlungRevVarSampFieldsModelPrimitives, ZaehlungRevVarSampFieldsModelSelector } from "./ZaehlungRevVarSampFieldsModel.base"

/**
 * ZaehlungRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const ZaehlungRevVarSampFieldsModel = ZaehlungRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
