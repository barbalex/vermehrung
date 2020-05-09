import { KulturMinFieldsModelBase } from "./KulturMinFieldsModel.base"


/* A graphql query fragment builders for KulturMinFieldsModel */
export { selectFromKulturMinFields, kulturMinFieldsModelPrimitives, KulturMinFieldsModelSelector } from "./KulturMinFieldsModel.base"

/**
 * KulturMinFieldsModel
 *
 * aggregate min on columns
 */
export const KulturMinFieldsModel = KulturMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
