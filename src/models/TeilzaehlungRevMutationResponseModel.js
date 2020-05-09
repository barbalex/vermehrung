import { TeilzaehlungRevMutationResponseModelBase } from "./TeilzaehlungRevMutationResponseModel.base"


/* A graphql query fragment builders for TeilzaehlungRevMutationResponseModel */
export { selectFromTeilzaehlungRevMutationResponse, teilzaehlungRevMutationResponseModelPrimitives, TeilzaehlungRevMutationResponseModelSelector } from "./TeilzaehlungRevMutationResponseModel.base"

/**
 * TeilzaehlungRevMutationResponseModel
 *
 * response of any mutation on the table "teilzaehlung_rev"
 */
export const TeilzaehlungRevMutationResponseModel = TeilzaehlungRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
