import React, { useCallback, useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import isEqual from 'lodash/isEqual'

import { History } from '../../../shared/History/index.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { toPgArray } from '../../../../utils/toPgArray.js'
import { mutations } from '../../../../utils/mutations.js'
import { createDataArrayForGartenRevComparison } from '../createDataArrayForRevComparison.js'

export const GartenHistoryRow = observer(
  ({ row, revRow, historyTakeoverCallback }) => {
    const store = useContext(MobxStoreContext)
    const { user, addNotification, db, gqlClient } = store

    const dataArray = useMemo(
      () => createDataArrayForGartenRevComparison({ row, revRow, store }),
      [revRow, row, store],
    )
    const onClickWiderspruchUebernehmen = useCallback(async () => {
      // need to attach to the winner, that is row
      // otherwise risk to still have lower depth and thus loosing
      const newDepth = row._depth + 1
      const newObject = {
        garten_id: revRow.garten_id,
        name: revRow.name,
        person_id: revRow.person_id,
        strasse: revRow.strasse,
        plz: revRow.plz,
        ort: revRow.ort,
        geom_point: revRow.geom_point,
        aktiv: revRow.aktiv,
        bemerkungen: revRow.bemerkungen,
        _parent_rev: row._rev,
        _depth: newDepth,
        _deleted: revRow._deleted,
      }
      const rev = `${newDepth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      newObject.id = uuidv1()
      newObject.changed = new window.Date().toISOString()
      newObject.changed_by = user.email
      newObject._revisions = toPgArray([rev, ...row._revisions])
      const newObjectForStore = { ...newObject }
      //console.log('Kultur History', { row, revRow, newObject })
      const response = await gqlClient
        .query(mutations.mutateInsert_garten_rev_one, {
          object: newObject,
          on_conflict: {
            constraint: 'garten_rev_pkey',
            update_columns: ['id'],
          },
        })
        .toPromise()
      if (response.error) {
        checkForOnlineError({ error: response.error, store })
        return addNotification({
          message: response.error.message,
        })
      }
      historyTakeoverCallback()
      // do not stringify revisions for store
      // as _that_ is a real array
      newObjectForStore._revisions =
        row._revisions ? [rev, ...row._revisions] : [rev]
      // TODO: is this a good idea?
      newObjectForStore._conflicts = row._conflicts
      // for store: convert rev to winner
      newObjectForStore.id = row.id
      delete newObjectForStore.garten_id
      // optimistically update store
      await db.write(async () => {
        await row.update((row) => {
          Object.entries(newObjectForStore).forEach(([key, value]) => {
            if (!isEqual(value, row[key])) {
              row[key] = value
            }
          })
        })
      })
    }, [
      row,
      revRow.garten_id,
      revRow.name,
      revRow.person_id,
      revRow.strasse,
      revRow.plz,
      revRow.ort,
      revRow.geom_point,
      revRow.aktiv,
      revRow.bemerkungen,
      revRow._deleted,
      user.email,
      gqlClient,
      historyTakeoverCallback,
      db,
      store,
      addNotification,
    ])

    return (
      <History
        rev={revRow._rev}
        dataArray={dataArray}
        onClickWiderspruchUebernehmen={onClickWiderspruchUebernehmen}
      />
    )
  },
)
