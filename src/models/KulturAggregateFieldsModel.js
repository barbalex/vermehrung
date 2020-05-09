import { KulturAggregateFieldsModelBase } from "./KulturAggregateFieldsModel.base"


/* A graphql query fragment builders for KulturAggregateFieldsModel */
export { selectFromKulturAggregateFields, kulturAggregateFieldsModelPrimitives, KulturAggregateFieldsModelSelector } from "./KulturAggregateFieldsModel.base"

/**
 * KulturAggregateFieldsModel
 *
 * aggregate fields of "kultur"
 */
export const KulturAggregateFieldsModel = KulturAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
