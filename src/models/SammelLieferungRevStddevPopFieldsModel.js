import { SammelLieferungRevStddevPopFieldsModelBase } from "./SammelLieferungRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevStddevPopFieldsModel */
export { selectFromSammelLieferungRevStddevPopFields, sammelLieferungRevStddevPopFieldsModelPrimitives, SammelLieferungRevStddevPopFieldsModelSelector } from "./SammelLieferungRevStddevPopFieldsModel.base"

/**
 * SammelLieferungRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const SammelLieferungRevStddevPopFieldsModel = SammelLieferungRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
