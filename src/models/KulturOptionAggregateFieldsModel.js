import { KulturOptionAggregateFieldsModelBase } from "./KulturOptionAggregateFieldsModel.base"


/* A graphql query fragment builders for KulturOptionAggregateFieldsModel */
export { selectFromKulturOptionAggregateFields, kulturOptionAggregateFieldsModelPrimitives, KulturOptionAggregateFieldsModelSelector } from "./KulturOptionAggregateFieldsModel.base"

/**
 * KulturOptionAggregateFieldsModel
 *
 * aggregate fields of "kultur_option"
 */
export const KulturOptionAggregateFieldsModel = KulturOptionAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
