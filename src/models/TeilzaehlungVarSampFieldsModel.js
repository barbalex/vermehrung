import { TeilzaehlungVarSampFieldsModelBase } from "./TeilzaehlungVarSampFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungVarSampFieldsModel */
export { selectFromTeilzaehlungVarSampFields, teilzaehlungVarSampFieldsModelPrimitives, TeilzaehlungVarSampFieldsModelSelector } from "./TeilzaehlungVarSampFieldsModel.base"

/**
 * TeilzaehlungVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const TeilzaehlungVarSampFieldsModel = TeilzaehlungVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
