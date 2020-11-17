/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'

/**
 * ae_artBase
 * auto generated base class for the model ae_artModel.
 */
export const ae_artModelBase = ModelBase.named('ae_art')
  .props({
    __typename: types.optional(types.literal('ae_art'), 'ae_art'),
    changed: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class ae_artModelSelector extends QueryBuilder {
  get changed() {
    return this.__attr(`changed`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get name() {
    return this.__attr(`name`)
  }
}
export function selectFromae_art() {
  return new ae_artModelSelector()
}

export const ae_artModelPrimitives = selectFromae_art().changed.name
