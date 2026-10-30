import { useEffect } from 'react'

// trying to persist indexedDB
// https://dexie.org/docs/StorageManager#controlling-persistence
// browsers grant this by engagement heuristics (installed pwa, bookmarks,
// usage) - on localhost dev it is typically not granted, which is fine
async function persist() {
  if (!navigator.storage?.persist) return
  await navigator.storage.persist()
  // the request result is true if storage was ALREADY persistent,
  // so it says nothing about whether this request changed anything.
  // only a final persisted() of false means eviction risk remains.
  if (!(await navigator.storage.persisted())) {
    console.warn('storage is not persisted safely')
  }
}

export const StoragePersister = () => {
  useEffect(() => {
    persist()
  }, [])

  return null
}
