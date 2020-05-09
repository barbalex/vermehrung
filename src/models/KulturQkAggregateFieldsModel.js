import { KulturQkAggregateFieldsModelBase } from "./KulturQkAggregateFieldsModel.base"


/* A graphql query fragment builders for KulturQkAggregateFieldsModel */
export { selectFromKulturQkAggregateFields, kulturQkAggregateFieldsModelPrimitives, KulturQkAggregateFieldsModelSelector } from "./KulturQkAggregateFieldsModel.base"

/**
 * KulturQkAggregateFieldsModel
 *
 * aggregate fields of "kultur_qk"
 */
export const KulturQkAggregateFieldsModel = KulturQkAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
