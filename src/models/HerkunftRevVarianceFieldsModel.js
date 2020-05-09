import { HerkunftRevVarianceFieldsModelBase } from "./HerkunftRevVarianceFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevVarianceFieldsModel */
export { selectFromHerkunftRevVarianceFields, herkunftRevVarianceFieldsModelPrimitives, HerkunftRevVarianceFieldsModelSelector } from "./HerkunftRevVarianceFieldsModel.base"

/**
 * HerkunftRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const HerkunftRevVarianceFieldsModel = HerkunftRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
