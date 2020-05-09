import { ArtQkVarSampFieldsModelBase } from "./ArtQkVarSampFieldsModel.base"


/* A graphql query fragment builders for ArtQkVarSampFieldsModel */
export { selectFromArtQkVarSampFields, artQkVarSampFieldsModelPrimitives, ArtQkVarSampFieldsModelSelector } from "./ArtQkVarSampFieldsModel.base"

/**
 * ArtQkVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const ArtQkVarSampFieldsModel = ArtQkVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
