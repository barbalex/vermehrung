import { apiClient } from './apiClient.js'
import { setApiClient } from '../store/index.js'
import { recreatePersistedStore } from './recreatePersistedStore.js'

export const initiateApp = async () => {
  setApiClient(apiClient)
  const unregisterAuthObserver = await recreatePersistedStore()
  return { unregister: unregisterAuthObserver }
}
