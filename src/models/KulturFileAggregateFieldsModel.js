import { KulturFileAggregateFieldsModelBase } from "./KulturFileAggregateFieldsModel.base"


/* A graphql query fragment builders for KulturFileAggregateFieldsModel */
export { selectFromKulturFileAggregateFields, kulturFileAggregateFieldsModelPrimitives, KulturFileAggregateFieldsModelSelector } from "./KulturFileAggregateFieldsModel.base"

/**
 * KulturFileAggregateFieldsModel
 *
 * aggregate fields of "kultur_file"
 */
export const KulturFileAggregateFieldsModel = KulturFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
