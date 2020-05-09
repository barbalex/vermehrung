import { TeilzaehlungStddevPopFieldsModelBase } from "./TeilzaehlungStddevPopFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungStddevPopFieldsModel */
export { selectFromTeilzaehlungStddevPopFields, teilzaehlungStddevPopFieldsModelPrimitives, TeilzaehlungStddevPopFieldsModelSelector } from "./TeilzaehlungStddevPopFieldsModel.base"

/**
 * TeilzaehlungStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const TeilzaehlungStddevPopFieldsModel = TeilzaehlungStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
