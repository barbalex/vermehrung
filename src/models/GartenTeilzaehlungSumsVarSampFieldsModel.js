import { GartenTeilzaehlungSumsVarSampFieldsModelBase } from "./GartenTeilzaehlungSumsVarSampFieldsModel.base"


/* A graphql query fragment builders for GartenTeilzaehlungSumsVarSampFieldsModel */
export { selectFromGartenTeilzaehlungSumsVarSampFields, gartenTeilzaehlungSumsVarSampFieldsModelPrimitives, GartenTeilzaehlungSumsVarSampFieldsModelSelector } from "./GartenTeilzaehlungSumsVarSampFieldsModel.base"

/**
 * GartenTeilzaehlungSumsVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const GartenTeilzaehlungSumsVarSampFieldsModel = GartenTeilzaehlungSumsVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
