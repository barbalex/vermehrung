import { ArtQkChoosenMutationResponseModelBase } from "./ArtQkChoosenMutationResponseModel.base"


/* A graphql query fragment builders for ArtQkChoosenMutationResponseModel */
export { selectFromArtQkChoosenMutationResponse, artQkChoosenMutationResponseModelPrimitives, ArtQkChoosenMutationResponseModelSelector } from "./ArtQkChoosenMutationResponseModel.base"

/**
 * ArtQkChoosenMutationResponseModel
 *
 * response of any mutation on the table "art_qk_choosen"
 */
export const ArtQkChoosenMutationResponseModel = ArtQkChoosenMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
