import { KulturOptionMutationResponseModelBase } from "./KulturOptionMutationResponseModel.base"


/* A graphql query fragment builders for KulturOptionMutationResponseModel */
export { selectFromKulturOptionMutationResponse, kulturOptionMutationResponseModelPrimitives, KulturOptionMutationResponseModelSelector } from "./KulturOptionMutationResponseModel.base"

/**
 * KulturOptionMutationResponseModel
 *
 * response of any mutation on the table "kultur_option"
 */
export const KulturOptionMutationResponseModel = KulturOptionMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
