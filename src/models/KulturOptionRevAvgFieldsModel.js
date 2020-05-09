import { KulturOptionRevAvgFieldsModelBase } from "./KulturOptionRevAvgFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevAvgFieldsModel */
export { selectFromKulturOptionRevAvgFields, kulturOptionRevAvgFieldsModelPrimitives, KulturOptionRevAvgFieldsModelSelector } from "./KulturOptionRevAvgFieldsModel.base"

/**
 * KulturOptionRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const KulturOptionRevAvgFieldsModel = KulturOptionRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
