import { KulturMaxFieldsModelBase } from "./KulturMaxFieldsModel.base"


/* A graphql query fragment builders for KulturMaxFieldsModel */
export { selectFromKulturMaxFields, kulturMaxFieldsModelPrimitives, KulturMaxFieldsModelSelector } from "./KulturMaxFieldsModel.base"

/**
 * KulturMaxFieldsModel
 *
 * aggregate max on columns
 */
export const KulturMaxFieldsModel = KulturMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
