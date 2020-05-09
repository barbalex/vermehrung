import { KulturQkMutationResponseModelBase } from "./KulturQkMutationResponseModel.base"


/* A graphql query fragment builders for KulturQkMutationResponseModel */
export { selectFromKulturQkMutationResponse, kulturQkMutationResponseModelPrimitives, KulturQkMutationResponseModelSelector } from "./KulturQkMutationResponseModel.base"

/**
 * KulturQkMutationResponseModel
 *
 * response of any mutation on the table "kultur_qk"
 */
export const KulturQkMutationResponseModel = KulturQkMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
