import { KulturMutationResponseModelBase } from "./KulturMutationResponseModel.base"


/* A graphql query fragment builders for KulturMutationResponseModel */
export { selectFromKulturMutationResponse, kulturMutationResponseModelPrimitives, KulturMutationResponseModelSelector } from "./KulturMutationResponseModel.base"

/**
 * KulturMutationResponseModel
 *
 * response of any mutation on the table "kultur"
 */
export const KulturMutationResponseModel = KulturMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
