import { KulturOptionRevSumFieldsModelBase } from "./KulturOptionRevSumFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevSumFieldsModel */
export { selectFromKulturOptionRevSumFields, kulturOptionRevSumFieldsModelPrimitives, KulturOptionRevSumFieldsModelSelector } from "./KulturOptionRevSumFieldsModel.base"

/**
 * KulturOptionRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const KulturOptionRevSumFieldsModel = KulturOptionRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
