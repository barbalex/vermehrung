import { KulturFileMaxFieldsModelBase } from "./KulturFileMaxFieldsModel.base"


/* A graphql query fragment builders for KulturFileMaxFieldsModel */
export { selectFromKulturFileMaxFields, kulturFileMaxFieldsModelPrimitives, KulturFileMaxFieldsModelSelector } from "./KulturFileMaxFieldsModel.base"

/**
 * KulturFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const KulturFileMaxFieldsModel = KulturFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
