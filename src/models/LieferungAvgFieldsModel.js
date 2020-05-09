import { LieferungAvgFieldsModelBase } from "./LieferungAvgFieldsModel.base"


/* A graphql query fragment builders for LieferungAvgFieldsModel */
export { selectFromLieferungAvgFields, lieferungAvgFieldsModelPrimitives, LieferungAvgFieldsModelSelector } from "./LieferungAvgFieldsModel.base"

/**
 * LieferungAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const LieferungAvgFieldsModel = LieferungAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
