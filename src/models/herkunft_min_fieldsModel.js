import { herkunft_min_fieldsModelBase } from "./herkunft_min_fieldsModel.base"


/* A graphql query fragment builders for herkunft_min_fieldsModel */
export { selectFromherkunft_min_fields, herkunft_min_fieldsModelPrimitives, herkunft_min_fieldsModelSelector } from "./herkunft_min_fieldsModel.base"

/**
 * herkunft_min_fieldsModel
 *
 * aggregate min on columns
 */
export const herkunft_min_fieldsModel = herkunft_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
