import { KulturOptionRevVarianceFieldsModelBase } from "./KulturOptionRevVarianceFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevVarianceFieldsModel */
export { selectFromKulturOptionRevVarianceFields, kulturOptionRevVarianceFieldsModelPrimitives, KulturOptionRevVarianceFieldsModelSelector } from "./KulturOptionRevVarianceFieldsModel.base"

/**
 * KulturOptionRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const KulturOptionRevVarianceFieldsModel = KulturOptionRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
