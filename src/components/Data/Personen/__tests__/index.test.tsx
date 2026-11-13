// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import { Provider } from 'jotai'
import '@testing-library/jest-dom/vitest'
import { of } from 'rxjs'

vi.mock('react-window', () => ({
  // render every row synchronously - virtualization itself is not
  // under test here
  List: ({
    rowComponent: RowComponent,
    rowCount,
    rowProps,
  }: {
    rowComponent: React.ComponentType<Record<string, unknown>>
    rowCount: number
    rowProps: Record<string, unknown>
  }) => (
    <div data-testid="list">
      {Array.from({ length: rowCount }, (_, index) => (
        <RowComponent
          key={index}
          index={index}
          {...rowProps}
        />
      ))}
    </div>
  ),
}))

import { store, dbAtom, userAtom } from '../../../../store/index.ts'

// the app mounts with its custom jotai store (see main.tsx) - the
// components read atoms through this provider, not the default store
const renderWithStore = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>)
import { Personen } from '../index.tsx'

const buildPerson = (overrides: Record<string, unknown> = {}) => ({
  id: 'p1',
  nr: null,
  vorname: null,
  name: 'Muster',
  ort: null,
  aktiv: true,
  ...overrides,
})

// minimal db stand-in: the persons and user_role collections answer
// with rxjs observables; query clauses are captured for assertions
const buildDb = ({
  persons,
  role,
}: {
  persons: Record<string, unknown>[]
  role: { name: string } | null
}) => {
  const queryCalls: unknown[][] = []
  const db = {
    get: (table: string) => ({
      query: (...clauses: unknown[]) => {
        queryCalls.push([table, ...clauses])
        return {
          observeCount: () => of(persons.length),
          observeWithColumns: () =>
            of(
              table === 'person' ? persons
              : role ? [role]
              : [],
            ),
        }
      },
    }),
  }
  return { db: db as never, queryCalls }
}

describe('Personen list', () => {
  beforeEach(() => {
    store.set(userAtom, { uid: 'test-uid', email: 'a@b.c' })
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the rows sorted by name', async () => {
    const { db } = buildDb({
      persons: [
        buildPerson({ id: 'p1', name: 'Zimmermann' }),
        buildPerson({ id: 'p2', name: 'Abt', ort: 'Zürich' }),
      ],
      role: { name: 'manager' },
    })
    store.set(dbAtom, db)

    renderWithStore(<Personen />)

    const rows = await waitFor(() => {
      const list = screen.getByTestId('list')
      const labels = [...list.children].map((c) => c.textContent)
      expect(labels).toEqual(['Abt (Zürich)', 'Zimmermann'])
      return list
    })
    expect(rows.children).toHaveLength(2)
  })

  it('shows total and filtered counts', async () => {
    const { db } = buildDb({
      persons: [buildPerson({ id: 'p1' })],
      role: { name: 'manager' },
    })
    store.set(dbAtom, db)

    renderWithStore(<Personen />)

    await waitFor(() => {
      expect(screen.getByTitle('gefilterte Anzahl').textContent).toBe('1')
      expect(screen.getByTitle('totale Anzahl').textContent).toBe('1')
    })
  })

  it('shows the add button only for managers', async () => {
    const asManager = buildDb({
      persons: [],
      role: { name: 'manager' },
    })
    store.set(dbAtom, asManager.db)
    const { unmount } = renderWithStore(<Personen />)
    await waitFor(() => {
      expect(screen.getByTitle('neue Person')).toBeInTheDocument()
    })
    unmount()

    const asGaertner = buildDb({
      persons: [],
      role: { name: 'gaertner' },
    })
    store.set(dbAtom, asGaertner.db)
    renderWithStore(<Personen />)
    await waitFor(() => {
      expect(screen.getByTitle('totale Anzahl')).toBeInTheDocument()
    })
    expect(screen.queryByTitle('neue Person')).not.toBeInTheDocument()
  })
})
