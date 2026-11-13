import { useEffect } from 'react'
import { useAtomValue } from 'jotai'

import {
  gettingAuthUserAtom,
  initialDataQueriedAtom,
  initiallyQueryingAtom,
  userAtom,
  onlineAtom,
  addNotification,
  removeNotificationById,
} from '../../store/index.ts'
import { tableNames } from '../../utils/tableNames.ts'

export const InitialDataLoadingNotifier = () => {
  const gettingAuthUser = useAtomValue(gettingAuthUserAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)
  const initiallyQuerying = useAtomValue(initiallyQueryingAtom)
  const user = useAtomValue(userAtom)
  const online = useAtomValue(onlineAtom)

  const existsUser = !!user?.uid

  useEffect(() => {
    let id: string | undefined
    if (existsUser && !gettingAuthUser && online && !initialDataQueried) {
      id = addNotification({
        message: `lade Daten für offline-Nutzung (${tableNames(
          initiallyQuerying,
        )})`,
        type: 'info',
        duration: 2000,
      })
    }

    return () => {
      if (id) {
        removeNotificationById(id)
      }
    }
  }, [
    existsUser,
    gettingAuthUser,
    initialDataQueried,
    initiallyQuerying,
    online,
  ])

  // no fallback that clears stuck messages is needed: every notification
  // removes itself after its duration, and initialDataQueried settles
  // reliably - processSubscriptionResult flips each table's flag in the
  // write's finally, so the effect cleanup above always runs

  return null
}
