import { LieferungRevStddevPopFieldsModelBase } from "./LieferungRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for LieferungRevStddevPopFieldsModel */
export { selectFromLieferungRevStddevPopFields, lieferungRevStddevPopFieldsModelPrimitives, LieferungRevStddevPopFieldsModelSelector } from "./LieferungRevStddevPopFieldsModel.base"

/**
 * LieferungRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const LieferungRevStddevPopFieldsModel = LieferungRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
