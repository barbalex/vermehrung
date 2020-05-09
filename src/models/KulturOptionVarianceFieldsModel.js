import { KulturOptionVarianceFieldsModelBase } from "./KulturOptionVarianceFieldsModel.base"


/* A graphql query fragment builders for KulturOptionVarianceFieldsModel */
export { selectFromKulturOptionVarianceFields, kulturOptionVarianceFieldsModelPrimitives, KulturOptionVarianceFieldsModelSelector } from "./KulturOptionVarianceFieldsModel.base"

/**
 * KulturOptionVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const KulturOptionVarianceFieldsModel = KulturOptionVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
