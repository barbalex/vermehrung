import { apiClient } from './apiClient.ts'
import { setApiClient } from '../store/index.ts'
import { recreatePersistedStore } from './recreatePersistedStore.ts'

export const initiateApp = async () => {
  setApiClient(apiClient)
  const unregisterAuthObserver = await recreatePersistedStore()
  return { unregister: unregisterAuthObserver }
}
