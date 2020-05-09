import { KulturFileMinFieldsModelBase } from "./KulturFileMinFieldsModel.base"


/* A graphql query fragment builders for KulturFileMinFieldsModel */
export { selectFromKulturFileMinFields, kulturFileMinFieldsModelPrimitives, KulturFileMinFieldsModelSelector } from "./KulturFileMinFieldsModel.base"

/**
 * KulturFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const KulturFileMinFieldsModel = KulturFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
