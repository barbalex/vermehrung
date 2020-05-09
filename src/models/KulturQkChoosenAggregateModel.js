import { KulturQkChoosenAggregateModelBase } from "./KulturQkChoosenAggregateModel.base"


/* A graphql query fragment builders for KulturQkChoosenAggregateModel */
export { selectFromKulturQkChoosenAggregate, kulturQkChoosenAggregateModelPrimitives, KulturQkChoosenAggregateModelSelector } from "./KulturQkChoosenAggregateModel.base"

/**
 * KulturQkChoosenAggregateModel
 *
 * aggregated selection of "kultur_qk_choosen"
 */
export const KulturQkChoosenAggregateModel = KulturQkChoosenAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
