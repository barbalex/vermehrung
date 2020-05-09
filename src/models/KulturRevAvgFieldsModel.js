import { KulturRevAvgFieldsModelBase } from "./KulturRevAvgFieldsModel.base"


/* A graphql query fragment builders for KulturRevAvgFieldsModel */
export { selectFromKulturRevAvgFields, kulturRevAvgFieldsModelPrimitives, KulturRevAvgFieldsModelSelector } from "./KulturRevAvgFieldsModel.base"

/**
 * KulturRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const KulturRevAvgFieldsModel = KulturRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
