import { ZaehlungRevMutationResponseModelBase } from "./ZaehlungRevMutationResponseModel.base"


/* A graphql query fragment builders for ZaehlungRevMutationResponseModel */
export { selectFromZaehlungRevMutationResponse, zaehlungRevMutationResponseModelPrimitives, ZaehlungRevMutationResponseModelSelector } from "./ZaehlungRevMutationResponseModel.base"

/**
 * ZaehlungRevMutationResponseModel
 *
 * response of any mutation on the table "zaehlung_rev"
 */
export const ZaehlungRevMutationResponseModel = ZaehlungRevMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
