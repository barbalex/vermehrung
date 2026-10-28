import { describe, expect, it } from 'vitest'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { Database } from '@nozbe/watermelondb'
import { Q } from '@nozbe/watermelondb'

import { Art, ArtFile } from '../src/dbModel.ts'
import { schema } from '../src/dbSchema/schema.js'
import { migrations } from '../src/utils/migrations.js'

// reproduces the Files upload write with a real watermelon db
describe('file write', () => {
  it('creates the art_file row so the children query finds it', async () => {
    const adapter = new LokiJSAdapter({
      schema,
      migrations,
      useWebWorker: false,
      useIncrementalIndexedDB: false,
    })
    const db = new Database({ adapter, modelClasses: [Art, ArtFile] })
    const ART_ID = '11111111-1111-1111-8111-111111111111'
    const raw = {
      id: 'e7212d90-d2b9-11f1-82b7-4dec526b5121',
      file_id: '407c9548-8a0d-4fe5-9245-2cda83d68a96',
      file_mime_type: 'text/plain',
      art_id: ART_ID,
      name: 'ux8-test.txt',
    }
    await db.write(async () => {
      await db.batch([
        db.get('art').prepareCreateFromDirtyRaw({
          id: ART_ID,
          ae_id: '22222222-2222-1222-8222-222222222222',
          _deleted: false,
        }),
      ])
    })
    const art = await db.get('art').find(ART_ID)
    const files = await art.files.fetch()
    expect(files.length).toBe(0)
    await db.write(async () => {
      const collection = db.get('art_file')
      await db.batch([collection.prepareCreateFromDirtyRaw(raw)])
    })
    const after = await art.files.fetch()
    console.log('rows after write:', JSON.stringify(after.map((f) => ({ name: f.name, art_id: f.art_id, mime: f.file_mime_type }))))
    expect(after.length).toBe(1)
    expect(after[0].name).toBe('ux8-test.txt')
    expect(after[0].file_mime_type).toBe('text/plain')
  })
})
