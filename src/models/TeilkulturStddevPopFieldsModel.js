import { TeilkulturStddevPopFieldsModelBase } from "./TeilkulturStddevPopFieldsModel.base"


/* A graphql query fragment builders for TeilkulturStddevPopFieldsModel */
export { selectFromTeilkulturStddevPopFields, teilkulturStddevPopFieldsModelPrimitives, TeilkulturStddevPopFieldsModelSelector } from "./TeilkulturStddevPopFieldsModel.base"

/**
 * TeilkulturStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const TeilkulturStddevPopFieldsModel = TeilkulturStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
