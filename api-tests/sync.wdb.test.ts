import { readFileSync } from 'node:fs'
import path from 'node:path'
import { Q } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { Database } from '@nozbe/watermelondb'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { store, dbAtom, lastUpdatedAtom, initiallyQueriedAtom } from '../src/store/index.js'
import { processSubscriptionResult } from '../src/utils/processSubscriptionResult.js'
import * as models from '../src/dbModel.ts'
import { migrations } from '../src/utils/migrations.js'
import { schema } from '../src/dbSchema/schema.js'

// Reproduces the full client path for the tree's option gating with a REAL
// WatermelonDB: import real prod sync rows for person + person_option,
// then run the exact association query the Tree component runs.

const USER_UID = 'ogA6AUQKd5byQkU2BXetDxvSLZi1'
const PERSON_ID = '15218c0e-b957-11ea-bfd4-4f97a2ba4da0'

const payload = JSON.parse(
  readFileSync(path.join(__dirname, 'fixtures', 'prod-sync-person-personoption.json'), 'utf8'),
)

const flush = () => new Promise((resolve) => setTimeout(resolve, 20))

describe('tree option query against real watermelondb', () => {
  let db: Database

  beforeEach(async () => {
    const adapter = new LokiJSAdapter({
      schema,
      migrations,
      useWebWorker: false,
      useIncrementalIndexedDB: false,
    })
    db = new Database({
      adapter,
      // @ts-expect-error test setup
      modelClasses: Object.values(models).filter((m: any) => m?.prototype),
    })
    store.set(dbAtom, db as any)
    store.set(lastUpdatedAtom, { person: 0, person_option: 0 })
    store.set(initiallyQueriedAtom, { person: false, person_option: false })
  })

  it('imports sync rows and finds the option row via the tree association query', async () => {
    await processSubscriptionResult({
      data: payload.person,
      table: 'person',
      lastUpdatedValue: 1,
    })
    await processSubscriptionResult({
      data: payload.person_option,
      table: 'person_option',
      lastUpdatedValue: 1,
    })
    await flush()

    // the exact query Tree/index.jsx runs
    const optionRows = await db
      .get('person_option')
      .query(Q.on('person', Q.where('account_id', USER_UID)))
      .fetch()

    expect(optionRows.length, 'association query must find the option row').toBeGreaterThan(0)
    const option = optionRows[0] as any
    expect(option.tree_kultur).toBe(true)
    expect(option.tree_teilkultur).toBe(true)
    expect(option.tree_zaehlung).toBe(true)
    expect(option.tree_lieferung).toBe(true)
  })
})
