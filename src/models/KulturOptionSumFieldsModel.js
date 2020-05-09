import { KulturOptionSumFieldsModelBase } from "./KulturOptionSumFieldsModel.base"


/* A graphql query fragment builders for KulturOptionSumFieldsModel */
export { selectFromKulturOptionSumFields, kulturOptionSumFieldsModelPrimitives, KulturOptionSumFieldsModelSelector } from "./KulturOptionSumFieldsModel.base"

/**
 * KulturOptionSumFieldsModel
 *
 * aggregate sum on columns
 */
export const KulturOptionSumFieldsModel = KulturOptionSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
