import { ZaehlungMutationResponseModelBase } from "./ZaehlungMutationResponseModel.base"


/* A graphql query fragment builders for ZaehlungMutationResponseModel */
export { selectFromZaehlungMutationResponse, zaehlungMutationResponseModelPrimitives, ZaehlungMutationResponseModelSelector } from "./ZaehlungMutationResponseModel.base"

/**
 * ZaehlungMutationResponseModel
 *
 * response of any mutation on the table "zaehlung"
 */
export const ZaehlungMutationResponseModel = ZaehlungMutationResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
