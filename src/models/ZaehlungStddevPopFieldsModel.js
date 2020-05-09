import { ZaehlungStddevPopFieldsModelBase } from "./ZaehlungStddevPopFieldsModel.base"


/* A graphql query fragment builders for ZaehlungStddevPopFieldsModel */
export { selectFromZaehlungStddevPopFields, zaehlungStddevPopFieldsModelPrimitives, ZaehlungStddevPopFieldsModelSelector } from "./ZaehlungStddevPopFieldsModel.base"

/**
 * ZaehlungStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const ZaehlungStddevPopFieldsModel = ZaehlungStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
