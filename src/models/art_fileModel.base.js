/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from 'mobx-state-tree'
import { MSTGQLRef, QueryBuilder } from 'mst-gql'
import { ModelBase } from './ModelBase'
import { artModel } from './artModel'
import { artModelSelector } from './artModel.base'

/**
 * art_fileBase
 * auto generated base class for the model art_fileModel.
 */
export const art_fileModelBase = ModelBase.named('art_file')
  .props({
    __typename: types.optional(types.literal('art_file'), 'art_file'),
    art_id: types.union(types.undefined, types.null, types.frozen()),
    beschreibung: types.union(types.undefined, types.null, types.string),
    file_id: types.union(types.undefined, types.null, types.frozen()),
    file_mime_type: types.union(types.undefined, types.null, types.string),
    id: types.identifier,
    name: types.union(types.undefined, types.null, types.string),
  })
  .views((self) => ({
    get store() {
      return self.__getStore()
    },
  }))

export class art_fileModelSelector extends QueryBuilder {
  get art_id() {
    return this.__attr(`art_id`)
  }
  get beschreibung() {
    return this.__attr(`beschreibung`)
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
  get name() {
    return this.__attr(`name`)
  }
}
export function selectFromart_file() {
  return new art_fileModelSelector()
}

export const art_fileModelPrimitives = selectFromart_file().art_id.beschreibung
  .file_id.file_mime_type.name
