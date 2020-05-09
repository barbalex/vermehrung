import { SubscriptionRootModelBase } from "./SubscriptionRootModel.base"


/* A graphql query fragment builders for SubscriptionRootModel */
export { selectFromSubscriptionRoot, subscriptionRootModelPrimitives, SubscriptionRootModelSelector } from "./SubscriptionRootModel.base"

/**
 * SubscriptionRootModel
 *
 * subscription root
 */
export const SubscriptionRootModel = SubscriptionRootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
