import { TeilzaehlungMutationResponseModelBase } from "./TeilzaehlungMutationResponseModel.base"


/* A graphql query fragment builders for TeilzaehlungMutationResponseModel */
export { selectFromTeilzaehlungMutationResponse, teilzaehlungMutationResponseModelPrimitives, TeilzaehlungMutationResponseModelSelector } from "./TeilzaehlungMutationResponseModel.base"

/**
 * TeilzaehlungMutationResponseModel
 *
 * response of any mutation on the table "teilzaehlung"
 */
export const TeilzaehlungMutationResponseModel = TeilzaehlungMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
