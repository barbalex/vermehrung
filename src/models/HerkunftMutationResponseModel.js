import { HerkunftMutationResponseModelBase } from "./HerkunftMutationResponseModel.base"


/* A graphql query fragment builders for HerkunftMutationResponseModel */
export { selectFromHerkunftMutationResponse, herkunftMutationResponseModelPrimitives, HerkunftMutationResponseModelSelector } from "./HerkunftMutationResponseModel.base"

/**
 * HerkunftMutationResponseModel
 *
 * response of any mutation on the table "herkunft"
 */
export const HerkunftMutationResponseModel = HerkunftMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
