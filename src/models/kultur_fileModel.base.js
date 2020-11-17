/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { kulturModel } from './kulturModel'
import { kulturModelSelector } from './kulturModel.base'

/**
 * kultur_fileBase
 * auto generated base class for the model kultur_fileModel.
 */
export const kultur_fileModelBase = ModelBase.named('kultur_file')
  .props({
    __typename: types.optional(types.literal('kultur_file'), 'kultur_file'),
    beschreibung: types.union(types.undefined, types.null, types.string),
    changed: types.union(types.undefined, types.null, types.frozen()),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    kultur_id: types.union(types.undefined, types.null, types.frozen()),
    name: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class kultur_fileModelSelector extends QueryBuilder {
  get beschreibung() {
    return this.__attr(`beschreibung`)
  }
  get changed() {
    return this.__attr(`changed`)
  }
  get file_id() {
    return this.__attr(`file_id`)
  }
  get file_mime_type() {
    return this.__attr(`file_mime_type`)
  }
  get id() {
    return this.__attr(`id`)
  }
  get kultur_id() {
    return this.__attr(`kultur_id`)
  }
  get name() {
    return this.__attr(`name`)
  }
}
export function selectFromkultur_file() {
  return new kultur_fileModelSelector()
}

export const kultur_fileModelPrimitives = selectFromkultur_file().beschreibung
  .changed.file_id.file_mime_type.kultur_id.name
