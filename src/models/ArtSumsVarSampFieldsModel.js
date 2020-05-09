import { ArtSumsVarSampFieldsModelBase } from "./ArtSumsVarSampFieldsModel.base"


/* A graphql query fragment builders for ArtSumsVarSampFieldsModel */
export { selectFromArtSumsVarSampFields, artSumsVarSampFieldsModelPrimitives, ArtSumsVarSampFieldsModelSelector } from "./ArtSumsVarSampFieldsModel.base"

/**
 * ArtSumsVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const ArtSumsVarSampFieldsModel = ArtSumsVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
