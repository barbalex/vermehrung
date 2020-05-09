import { KulturQkChoosenMutationResponseModelBase } from "./KulturQkChoosenMutationResponseModel.base"


/* A graphql query fragment builders for KulturQkChoosenMutationResponseModel */
export { selectFromKulturQkChoosenMutationResponse, kulturQkChoosenMutationResponseModelPrimitives, KulturQkChoosenMutationResponseModelSelector } from "./KulturQkChoosenMutationResponseModel.base"

/**
 * KulturQkChoosenMutationResponseModel
 *
 * response of any mutation on the table "kultur_qk_choosen"
 */
export const KulturQkChoosenMutationResponseModel = KulturQkChoosenMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
