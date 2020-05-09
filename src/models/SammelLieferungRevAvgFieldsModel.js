import { SammelLieferungRevAvgFieldsModelBase } from "./SammelLieferungRevAvgFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungRevAvgFieldsModel */
export { selectFromSammelLieferungRevAvgFields, sammelLieferungRevAvgFieldsModelPrimitives, SammelLieferungRevAvgFieldsModelSelector } from "./SammelLieferungRevAvgFieldsModel.base"

/**
 * SammelLieferungRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const SammelLieferungRevAvgFieldsModel = SammelLieferungRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
