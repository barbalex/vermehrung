import { ArtRevVarSampFieldsModelBase } from "./ArtRevVarSampFieldsModel.base"


/* A graphql query fragment builders for ArtRevVarSampFieldsModel */
export { selectFromArtRevVarSampFields, artRevVarSampFieldsModelPrimitives, ArtRevVarSampFieldsModelSelector } from "./ArtRevVarSampFieldsModel.base"

/**
 * ArtRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const ArtRevVarSampFieldsModel = ArtRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
