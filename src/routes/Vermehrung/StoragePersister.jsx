import { useEffect } from 'react'

// trying to persist indexedDB
// https://dexie.org/docs/StorageManager#controlling-persistence
// TODO: consider calling this only if user choose it in settings
// or pop own window to explain as shown in above link
// because it pops a request window
async function persist() {
  return (
    (await navigator.storage) &&
    navigator.storage.persist &&
    navigator.storage.persist()
  )
}

export const StoragePersister = () => {
  useEffect(() => {
    persist().then((val) => console.log('storage is persisted safely:', val))
  }, [])

  return null
}
