import { ArtVarSampFieldsModelBase } from "./ArtVarSampFieldsModel.base"


/* A graphql query fragment builders for ArtVarSampFieldsModel */
export { selectFromArtVarSampFields, artVarSampFieldsModelPrimitives, ArtVarSampFieldsModelSelector } from "./ArtVarSampFieldsModel.base"

/**
 * ArtVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const ArtVarSampFieldsModel = ArtVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
