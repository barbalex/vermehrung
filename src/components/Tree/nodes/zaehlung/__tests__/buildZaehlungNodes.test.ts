import { Database } from 'nitromelondb'
import LokiJSAdapter from 'nitromelondb/adapters/lokijs'
import { expect, it, vi } from 'vitest'
import { Teilzaehlung, Zaehlung } from '../../../../../dbModel.ts'
import { schema } from '../../../../../dbSchema/schema.ts'
import { buildZaehlungNodes } from '../index.ts'

it('loads labels for the whole folder with one child query, keeping totals separate', async () => {
  const adapter = new LokiJSAdapter({
    schema,
    useWebWorker: false,
    useIncrementalIndexedDB: false,
  })
  const db = new Database({ adapter, modelClasses: [Zaehlung, Teilzaehlung] })
  const parents = db.get<Zaehlung>('zaehlung')
  const children = db.get<Teilzaehlung>('teilzaehlung')
  const counts = ['a', 'b', 'c'].map((id) =>
    parents.prepareCreateFromDirtyRaw({ id, datum: '2026-05-15' }),
  )
  await db.write(() =>
    db.batch(
      ...counts,
      ...[
        ['a', 2],
        ['b', 0],
        ['a', 5],
      ].map(([id, plants]) =>
        children.prepareCreateFromDirtyRaw({
          zaehlung_id: id,
          anzahl_pflanzen: plants,
        }),
      ),
    ),
  )
  const query = vi.spyOn(adapter, 'query')
  const nodes = await buildZaehlungNodes(db, counts)
  expect(nodes.map((n) => n.label)).toEqual([
    '2026.05.15; __7/___/___',
    '2026.05.15; __0/___/___',
    '2026.05.15; ___/___/___',
  ])
  expect(query).toHaveBeenCalledTimes(1)
})
