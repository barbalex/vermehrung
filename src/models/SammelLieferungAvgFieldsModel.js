import { SammelLieferungAvgFieldsModelBase } from "./SammelLieferungAvgFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungAvgFieldsModel */
export { selectFromSammelLieferungAvgFields, sammelLieferungAvgFieldsModelPrimitives, SammelLieferungAvgFieldsModelSelector } from "./SammelLieferungAvgFieldsModel.base"

/**
 * SammelLieferungAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const SammelLieferungAvgFieldsModel = SammelLieferungAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
