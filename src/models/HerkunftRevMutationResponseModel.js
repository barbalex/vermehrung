import { HerkunftRevMutationResponseModelBase } from "./HerkunftRevMutationResponseModel.base"


/* A graphql query fragment builders for HerkunftRevMutationResponseModel */
export { selectFromHerkunftRevMutationResponse, herkunftRevMutationResponseModelPrimitives, HerkunftRevMutationResponseModelSelector } from "./HerkunftRevMutationResponseModel.base"

/**
 * HerkunftRevMutationResponseModel
 *
 * response of any mutation on the table "herkunft_rev"
 */
export const HerkunftRevMutationResponseModel = HerkunftRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
