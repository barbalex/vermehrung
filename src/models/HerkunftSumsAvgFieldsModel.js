import { HerkunftSumsAvgFieldsModelBase } from "./HerkunftSumsAvgFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsAvgFieldsModel */
export { selectFromHerkunftSumsAvgFields, herkunftSumsAvgFieldsModelPrimitives, HerkunftSumsAvgFieldsModelSelector } from "./HerkunftSumsAvgFieldsModel.base"

/**
 * HerkunftSumsAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const HerkunftSumsAvgFieldsModel = HerkunftSumsAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
