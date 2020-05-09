import { TeilzaehlungRevVarSampFieldsModelBase } from "./TeilzaehlungRevVarSampFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevVarSampFieldsModel */
export { selectFromTeilzaehlungRevVarSampFields, teilzaehlungRevVarSampFieldsModelPrimitives, TeilzaehlungRevVarSampFieldsModelSelector } from "./TeilzaehlungRevVarSampFieldsModel.base"

/**
 * TeilzaehlungRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const TeilzaehlungRevVarSampFieldsModel = TeilzaehlungRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
