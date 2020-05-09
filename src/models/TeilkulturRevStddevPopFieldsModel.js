import { TeilkulturRevStddevPopFieldsModelBase } from "./TeilkulturRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevStddevPopFieldsModel */
export { selectFromTeilkulturRevStddevPopFields, teilkulturRevStddevPopFieldsModelPrimitives, TeilkulturRevStddevPopFieldsModelSelector } from "./TeilkulturRevStddevPopFieldsModel.base"

/**
 * TeilkulturRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const TeilkulturRevStddevPopFieldsModel = TeilkulturRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
