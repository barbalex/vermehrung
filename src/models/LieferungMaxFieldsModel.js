import { LieferungMaxFieldsModelBase } from "./LieferungMaxFieldsModel.base"


/* A graphql query fragment builders for LieferungMaxFieldsModel */
export { selectFromLieferungMaxFields, lieferungMaxFieldsModelPrimitives, LieferungMaxFieldsModelSelector } from "./LieferungMaxFieldsModel.base"

/**
 * LieferungMaxFieldsModel
 *
 * aggregate max on columns
 */
export const LieferungMaxFieldsModel = LieferungMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
