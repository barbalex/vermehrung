/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'

/**
 * ae_art_max_fieldsBase
 * auto generated base class for the model ae_art_max_fieldsModel.
 */
export const ae_art_max_fieldsModelBase = ModelBase.named('ae_art_max_fields')
  .props({
    __typename: types.optional(
      types.literal('ae_art_max_fields'),
      'ae_art_max_fields',
    ),
    changed: types.union(types.undefined, types.null, types.frozen()),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class ae_art_max_fieldsModelSelector extends QueryBuilder {
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
export function selectFromae_art_max_fields() {
  return new ae_art_max_fieldsModelSelector()
}

export const ae_art_max_fieldsModelPrimitives = selectFromae_art_max_fields()
  .changed.name
