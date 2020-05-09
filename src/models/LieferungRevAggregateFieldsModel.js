import { LieferungRevAggregateFieldsModelBase } from "./LieferungRevAggregateFieldsModel.base"


/* A graphql query fragment builders for LieferungRevAggregateFieldsModel */
export { selectFromLieferungRevAggregateFields, lieferungRevAggregateFieldsModelPrimitives, LieferungRevAggregateFieldsModelSelector } from "./LieferungRevAggregateFieldsModel.base"

/**
 * LieferungRevAggregateFieldsModel
 *
 * aggregate fields of "lieferung_rev"
 */
export const LieferungRevAggregateFieldsModel = LieferungRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
