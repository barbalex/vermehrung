import { SammelLieferungRevStddevFieldsModelBase } from "./SammelLieferungRevStddevFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevStddevFieldsModel */
export { selectFromSammelLieferungRevStddevFields, sammelLieferungRevStddevFieldsModelPrimitives, SammelLieferungRevStddevFieldsModelSelector } from "./SammelLieferungRevStddevFieldsModel.base"

/**
 * SammelLieferungRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const SammelLieferungRevStddevFieldsModel = SammelLieferungRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
