import { KulturOptionMinFieldsModelBase } from "./KulturOptionMinFieldsModel.base"


/* A graphql query fragment builders for KulturOptionMinFieldsModel */
export { selectFromKulturOptionMinFields, kulturOptionMinFieldsModelPrimitives, KulturOptionMinFieldsModelSelector } from "./KulturOptionMinFieldsModel.base"

/**
 * KulturOptionMinFieldsModel
 *
 * aggregate min on columns
 */
export const KulturOptionMinFieldsModel = KulturOptionMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
