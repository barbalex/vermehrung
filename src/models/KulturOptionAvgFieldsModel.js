import { KulturOptionAvgFieldsModelBase } from "./KulturOptionAvgFieldsModel.base"


/* A graphql query fragment builders for KulturOptionAvgFieldsModel */
export { selectFromKulturOptionAvgFields, kulturOptionAvgFieldsModelPrimitives, KulturOptionAvgFieldsModelSelector } from "./KulturOptionAvgFieldsModel.base"

/**
 * KulturOptionAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const KulturOptionAvgFieldsModel = KulturOptionAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
