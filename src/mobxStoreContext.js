import { createContext } from 'react'

export const MobxStoreContext = createContext({})
export const MobxStoreProvider = MobxStoreContext.Provider
export const Consumer = MobxStoreContext.Consumer
