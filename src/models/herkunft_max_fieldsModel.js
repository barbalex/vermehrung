import { herkunft_max_fieldsModelBase } from "./herkunft_max_fieldsModel.base"


/* A graphql query fragment builders for herkunft_max_fieldsModel */
export { selectFromherkunft_max_fields, herkunft_max_fieldsModelPrimitives, herkunft_max_fieldsModelSelector } from "./herkunft_max_fieldsModel.base"

/**
 * herkunft_max_fieldsModel
 *
 * aggregate max on columns
 */
export const herkunft_max_fieldsModel = herkunft_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
