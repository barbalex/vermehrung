import { TeilkulturMutationResponseModelBase } from "./TeilkulturMutationResponseModel.base"


/* A graphql query fragment builders for TeilkulturMutationResponseModel */
export { selectFromTeilkulturMutationResponse, teilkulturMutationResponseModelPrimitives, TeilkulturMutationResponseModelSelector } from "./TeilkulturMutationResponseModel.base"

/**
 * TeilkulturMutationResponseModel
 *
 * response of any mutation on the table "teilkultur"
 */
export const TeilkulturMutationResponseModel = TeilkulturMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
