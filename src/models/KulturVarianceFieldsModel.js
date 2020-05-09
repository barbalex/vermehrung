import { KulturVarianceFieldsModelBase } from "./KulturVarianceFieldsModel.base"


/* A graphql query fragment builders for KulturVarianceFieldsModel */
export { selectFromKulturVarianceFields, kulturVarianceFieldsModelPrimitives, KulturVarianceFieldsModelSelector } from "./KulturVarianceFieldsModel.base"

/**
 * KulturVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const KulturVarianceFieldsModel = KulturVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
