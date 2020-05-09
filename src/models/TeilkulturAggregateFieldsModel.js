import { TeilkulturAggregateFieldsModelBase } from "./TeilkulturAggregateFieldsModel.base"


/* A graphql query fragment builders for TeilkulturAggregateFieldsModel */
export { selectFromTeilkulturAggregateFields, teilkulturAggregateFieldsModelPrimitives, TeilkulturAggregateFieldsModelSelector } from "./TeilkulturAggregateFieldsModel.base"

/**
 * TeilkulturAggregateFieldsModel
 *
 * aggregate fields of "teilkultur"
 */
export const TeilkulturAggregateFieldsModel = TeilkulturAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
