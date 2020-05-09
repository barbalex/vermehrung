import { KulturRevMaxFieldsModelBase } from "./KulturRevMaxFieldsModel.base"


/* A graphql query fragment builders for KulturRevMaxFieldsModel */
export { selectFromKulturRevMaxFields, kulturRevMaxFieldsModelPrimitives, KulturRevMaxFieldsModelSelector } from "./KulturRevMaxFieldsModel.base"

/**
 * KulturRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const KulturRevMaxFieldsModel = KulturRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
