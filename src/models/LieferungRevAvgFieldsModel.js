import { LieferungRevAvgFieldsModelBase } from "./LieferungRevAvgFieldsModel.base"


/* A graphql query fragment builders for LieferungRevAvgFieldsModel */
export { selectFromLieferungRevAvgFields, lieferungRevAvgFieldsModelPrimitives, LieferungRevAvgFieldsModelSelector } from "./LieferungRevAvgFieldsModel.base"

/**
 * LieferungRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const LieferungRevAvgFieldsModel = LieferungRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
