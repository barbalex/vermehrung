import React from 'react'

export const MobxStoreContext = React.createContext({})
export const MobxStoreProvider = MobxStoreContext.Provider
export const Consumer = MobxStoreContext.Consumer
export default MobxStoreContext
