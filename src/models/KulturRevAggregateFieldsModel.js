import { KulturRevAggregateFieldsModelBase } from "./KulturRevAggregateFieldsModel.base"


/* A graphql query fragment builders for KulturRevAggregateFieldsModel */
export { selectFromKulturRevAggregateFields, kulturRevAggregateFieldsModelPrimitives, KulturRevAggregateFieldsModelSelector } from "./KulturRevAggregateFieldsModel.base"

/**
 * KulturRevAggregateFieldsModel
 *
 * aggregate fields of "kultur_rev"
 */
export const KulturRevAggregateFieldsModel = KulturRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
