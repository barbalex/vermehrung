import { KulturAvgFieldsModelBase } from "./KulturAvgFieldsModel.base"


/* A graphql query fragment builders for KulturAvgFieldsModel */
export { selectFromKulturAvgFields, kulturAvgFieldsModelPrimitives, KulturAvgFieldsModelSelector } from "./KulturAvgFieldsModel.base"

/**
 * KulturAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const KulturAvgFieldsModel = KulturAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
