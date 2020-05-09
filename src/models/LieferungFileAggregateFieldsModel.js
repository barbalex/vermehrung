import { LieferungFileAggregateFieldsModelBase } from "./LieferungFileAggregateFieldsModel.base"


/* A graphql query fragment builders for LieferungFileAggregateFieldsModel */
export { selectFromLieferungFileAggregateFields, lieferungFileAggregateFieldsModelPrimitives, LieferungFileAggregateFieldsModelSelector } from "./LieferungFileAggregateFieldsModel.base"

/**
 * LieferungFileAggregateFieldsModel
 *
 * aggregate fields of "lieferung_file"
 */
export const LieferungFileAggregateFieldsModel = LieferungFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
