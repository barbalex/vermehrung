import { HerkunftSumsVarianceFieldsModelBase } from "./HerkunftSumsVarianceFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsVarianceFieldsModel */
export { selectFromHerkunftSumsVarianceFields, herkunftSumsVarianceFieldsModelPrimitives, HerkunftSumsVarianceFieldsModelSelector } from "./HerkunftSumsVarianceFieldsModel.base"

/**
 * HerkunftSumsVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const HerkunftSumsVarianceFieldsModel = HerkunftSumsVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
