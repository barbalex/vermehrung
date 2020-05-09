import { TeilkulturRevMutationResponseModelBase } from "./TeilkulturRevMutationResponseModel.base"


/* A graphql query fragment builders for TeilkulturRevMutationResponseModel */
export { selectFromTeilkulturRevMutationResponse, teilkulturRevMutationResponseModelPrimitives, TeilkulturRevMutationResponseModelSelector } from "./TeilkulturRevMutationResponseModel.base"

/**
 * TeilkulturRevMutationResponseModel
 *
 * response of any mutation on the table "teilkultur_rev"
 */
export const TeilkulturRevMutationResponseModel = TeilkulturRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
