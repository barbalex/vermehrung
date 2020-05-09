import { LieferungRevMaxFieldsModelBase } from "./LieferungRevMaxFieldsModel.base"


/* A graphql query fragment builders for LieferungRevMaxFieldsModel */
export { selectFromLieferungRevMaxFields, lieferungRevMaxFieldsModelPrimitives, LieferungRevMaxFieldsModelSelector } from "./LieferungRevMaxFieldsModel.base"

/**
 * LieferungRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const LieferungRevMaxFieldsModel = LieferungRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
