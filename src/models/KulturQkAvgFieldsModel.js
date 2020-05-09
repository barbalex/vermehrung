import { KulturQkAvgFieldsModelBase } from "./KulturQkAvgFieldsModel.base"


/* A graphql query fragment builders for KulturQkAvgFieldsModel */
export { selectFromKulturQkAvgFields, kulturQkAvgFieldsModelPrimitives, KulturQkAvgFieldsModelSelector } from "./KulturQkAvgFieldsModel.base"

/**
 * KulturQkAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const KulturQkAvgFieldsModel = KulturQkAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
