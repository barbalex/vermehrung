import { SammelLieferungAggregateFieldsModelBase } from "./SammelLieferungAggregateFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungAggregateFieldsModel */
export { selectFromSammelLieferungAggregateFields, sammelLieferungAggregateFieldsModelPrimitives, SammelLieferungAggregateFieldsModelSelector } from "./SammelLieferungAggregateFieldsModel.base"

/**
 * SammelLieferungAggregateFieldsModel
 *
 * aggregate fields of "sammel_lieferung"
 */
export const SammelLieferungAggregateFieldsModel = SammelLieferungAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
