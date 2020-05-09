import { LieferungAggregateFieldsModelBase } from "./LieferungAggregateFieldsModel.base"


/* A graphql query fragment builders for LieferungAggregateFieldsModel */
export { selectFromLieferungAggregateFields, lieferungAggregateFieldsModelPrimitives, LieferungAggregateFieldsModelSelector } from "./LieferungAggregateFieldsModel.base"

/**
 * LieferungAggregateFieldsModel
 *
 * aggregate fields of "lieferung"
 */
export const LieferungAggregateFieldsModel = LieferungAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
